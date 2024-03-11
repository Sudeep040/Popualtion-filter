import { Button, Input, TextField } from "@mui/material";

import { useEffect, useState } from "react";

export default function Data() {
  const [info, setInfo] = useState([]);
  const [filter, setFilter] = useState([]);
  const [value, setValue] = useState("");
  const [click, setclick] = useState(0);

  useEffect(() => {
    async function get() {
      await fetch(
        `https://datausa.io/api/data?drilldowns=Nation&measures=Population`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => setInfo(data.data));
    }
    get();
  }, [click]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let filterData = info.filter(
        (ite) =>
          ite.Population.toString().startsWith(value) ||
          ite.Year.toString().startsWith(value)
      );
      setFilter(filterData);
    }, 300);
  }, [value, info]);
  function handleDelete(id) {
    setInfo(info.filter((ite) => ite["Population"] != id));
  }
  return (
    <>
      <div className="px-5">
        <div className=" d-flex pb-5">
          <div className=" pt-3 w-25">
            <TextField
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Search with Year or Population"
              className=" w-100 pe-5"
            />
          </div>

          <Button
            onClick={() => {
              setclick(10);
              setValue("");
            }}
            className=" mt-3"
            variant="contained"
            color="primary"
          >
            Reset
          </Button>
          {/* <Button>Green</Button> */}
        </div>
        <table className=" table table-bordered ">
          <thead>
            <tr>
              <th>Year</th>
              <th>Population</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((ite) => (
              <tr>
                <td>{ite["Year"]} </td>
                <td>{ite["Population"]} </td>
                <td>
                  {" "}
                  <Button
                    onClick={() => {
                      handleDelete(ite["Population"]);
                    }}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
