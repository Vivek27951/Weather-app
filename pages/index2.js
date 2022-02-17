import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchTemp } from "../Redux";
import { FaTemperatureHigh, FaSearchLocation } from "react-icons/fa";
import { MdLocationOff, MdLocationOn } from "react-icons/md";

function TempContainer({ tempData, fetchTemp }) {
  const dispatch = useDispatch();
  const temperature = useSelector((state) => state.temp);
  const [city, setCity] = useState();

  //   dragElement(document.getElementById("mydiv"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onMouseDown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onMouseDown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onMouseUp = closeDragElement;
      // call a function whenever the cursor moves:
      document.onMouseMove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onMouseUp = null;
      document.onMouseMove = null;
    }
  }

  useEffect(() => {
    fetchTemp(city);
  }, [city]);

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "800px",
        padding: "200px",
      }}
    >
      <div
        id="mydiv"
        draggable="true"
        className="box"
        style={{
          width: "350px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          padding: "30px",
          color: "white",
          textAlign: "center",
          fontSize: "30px",
          borderRadius: "30px",
        }}
      >
        <div id="mydivheader" style={{ margin: "20px" }}>
          <input
            type="search"
            style={{
              height: "50px",
              borderRadius: "50px",
              fontSize: "30px",
              textAlign: "center",
              color: "red",
            }}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="Search City"
          />
          {temperature.error ? (
            <div style={{ marginTop: "50px" }}>
              <div style={{ display: "flex", color: "#922B21" }}>
                <MdLocationOff />
                <div>No Location Found</div>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "30px", color: "#28B463" }}>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "50px",
                  textTransform: "capitalize",
                }}
              >
                <MdLocationOn style={{ fontSize: "40px" }} /> {city}
              </div>
              <div>
                <FaTemperatureHigh />
                {temperature.temp.temp} Cel
                <div style={{ fontSize: "20px", marginTop: "5px" }}>
                  Min: {temperature.temp.temp_min} Cel | Max:{" "}
                  {temperature.temp.temp_max}
                  Cel
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tempData: state.temp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTemp: (city) => dispatch(fetchTemp(city)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TempContainer);
// export default TempContainer;
