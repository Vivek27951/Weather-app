import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchTemp } from "../Redux";
import { FaTemperatureHigh, FaSearchLocation } from "react-icons/fa";
import { MdLocationOff, MdLocationOn } from "react-icons/md";

function TempContainer({ tempData, fetchTemp }) {
  const dispatch = useDispatch();
  const temperature = useSelector((state) => state.temp);
  const [city, setCity] = useState();

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
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
        id="drag1"
        draggable="true"
        onDragStart={(e) => {
          drag(e);
        }}
        // ondragstart="drag(event)"
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
      <div style={{ display: "flex" }}>
        <div
          id="div1"
          onDrop={(e) => {
            drop(e);
          }}
          onDragOver={(e) => {
            allowDrop(e);
          }}
          // ondragover="allowDrop(event)"
          style={{
            width: "400px",
            height: "350px",
            padding: "20px",
            border: "2px solid white",
          }}
        ></div>
        <div
          id="div1"
          onDrop={(e) => {
            drop(e);
          }}
          onDragOver={(e) => {
            allowDrop(e);
          }}
          // ondragover="allowDrop(event)"
          style={{
            width: "400px",
            height: "350px",
            padding: "20px",
            border: "2px solid white",
          }}
        ></div>
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
