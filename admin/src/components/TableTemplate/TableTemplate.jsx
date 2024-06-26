import { useState, useEffect, useRef } from "react";
import axios from "../../axios";
import styles from "./TableTemplate.module.scss";

import TextEditor from "./subComponents/TextEditor";
import CropWindow from "./subComponents/CropWindow";
import Table from "./subComponents/Table";
import CreateNewRowButton from "./subComponents/CreateNewRowButton";
import Editor from "./subComponents/Editor";

const TableTemplate = ({ route }) => {
  const [headers] = useState({
    Authentication: "Bearer " + JSON.parse(localStorage.getItem("token")).token,
  });
  const [data, setData] = useState([]);
  const [columnsTitles, setColumnsTitles] = useState([]);
  const [series, setSeries] = useState({});

  const [currentRowInfo, setCurrentRowInfo] = useState({});
  const [requestBody, setRequestBody] = useState({});

  const [editorMode, setEditorMode] = useState("upload"); //or 'edit'
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [textEditorIsOpen, setTextEditorIsOpen] = useState(false);
  const [cropperIsOpen, setCropperIsOpen] = useState(false);

  const inputFileRef = useRef(null);
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState("");

  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    axios
      .get(route === "pictures" ? "all-pictures" : route, { headers: headers })
      .then((res) => {
        setData(res.data);
        setDataChanged(false);
      })
      .catch(() => {
        console.error(`Error occured while getting ${route}!`);
      });

    if (route === "pictures") {
      axios
        .get("series-descriptions", { headers: headers })
        .then((res) => {
          let temp = {};
          if (res.data) {
            Object.values(res.data)?.forEach((el) => {
              if (!temp.hasOwnProperty(el.category)) {
                temp[el.category] = [el?.series];
              } else {
                if (!temp[el.category].includes(el?.series)) {
                  temp[el.category].push(el?.series);
                }
              }
            });
          }
          setSeries(temp);
        })
        .catch(() => {
          console.error(`Error occured while getting series!`);
        });
    }
  }, [route, headers, dataChanged]);

  useEffect(() => {
    axios
      .get("columns", { headers: headers })
      .then((res) => {
        setColumnsTitles(res.data);
      })
      .catch(() => {
        console.error(`Error occured while getting columns!`);
      });
  }, [headers]);

  const closeIconStyle = {
    borderRadius: 2,
    border: "solid black 1px",
    cursor: "pointer",
  };

  const resetEditor = () => {
    setEditorMode("upload");
    setCurrentRowInfo({});
    setRequestBody({});
    setEditorIsOpen(false);
  };

  return (
    <div className={styles.tableWrapper}>
      {editorIsOpen ? (
        <Editor
          route={route}
          editorMode={editorMode}
          requestBody={requestBody}
          setRequestBody={setRequestBody}
          currentRowInfo={currentRowInfo}
          setCurrentRowInfo={setCurrentRowInfo}
          setEditorIsOpen={setEditorIsOpen}
          setTextEditorIsOpen={setTextEditorIsOpen}
          setCropperIsOpen={setCropperIsOpen}
          headers={headers}
          columnsTitles={columnsTitles}
          closeIconStyle={closeIconStyle}
          setDataChanged={setDataChanged}
          series={series}
          resetEditor={resetEditor}
        />
      ) : (
        <>
          {textEditorIsOpen ? (
            <TextEditor
              setEditorIsOpen={setEditorIsOpen}
              setTextEditorIsOpen={setTextEditorIsOpen}
              requestBody={requestBody}
              setRequestBody={setRequestBody}
              currentRowInfo={currentRowInfo}
              closeIconStyle={closeIconStyle}
            />
          ) : cropperIsOpen ? (
            <CropWindow
              cropperRef={cropperRef}
              setCropperIsOpen={setCropperIsOpen}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              currentRowInfo={currentRowInfo}
              requestBody={requestBody}
              setEditorIsOpen={setEditorIsOpen}
              setCurrentRowInfo={setCurrentRowInfo}
              setRequestBody={setRequestBody}
              setDataChanged={setDataChanged}
            />
          ) : (
            <></>
          )}
        </>
      )}
      {data || dataChanged ? (
        <Table
          data={data}
          setCurrentRowInfo={setCurrentRowInfo}
          setRequestBody={setRequestBody}
          setEditorMode={setEditorMode}
          setEditorIsOpen={setEditorIsOpen}
          route={route}
          columnsTitles={columnsTitles}
        />
      ) : (
        <></>
      )}
      <CreateNewRowButton
        route={route}
        inputFileRef={inputFileRef}
        setEditorIsOpen={setEditorIsOpen}
        currentRowInfo={currentRowInfo}
        requestBody={requestBody}
        headers={headers}
        setCropperIsOpen={setCropperIsOpen}
        resetEditor={resetEditor}
      />
    </div>
  );
};

export default TableTemplate;
