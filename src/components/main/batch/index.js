import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as apiaxios from "../../../api/service";
import "./style.css";
import Swal from "sweetalert2";
import * as constTable from "../../../constant/constTable";
import moment from 'moment';

export default function Batch(props) {
  let history = useHistory();
  const [idTemp, setIdTemp] = useState();
  const [posts, setPosts] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [isEqualBatch, setIsEqualBatch] = useState(true);
  const [messageErr, setMessageErr] = useState('');

  useEffect(() => {
    apiaxios.batchAPI("internshipcourse").then((res) => {
      setPosts(res.data.data);
    });

    // select Date present
    let getDate = new Date()
    let datePresent = moment().format('YYYY-MM-DD')
    let dateEnd = getDate.getFullYear() + '-' + ('0' + (getDate.getMonth() + 3)).slice(-2) + '-' + getDate.getDate()
    setDateStart(datePresent)
    setDateEnd(dateEnd)
  }, []);
  const [addFormData, setAddFormData] = useState({
    nameCoure: "",
    dateStart: "",
    dateEnd: "",
    status: "",
    kindOfInternship: "",
  });
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const newDateStart = addFormData.dateStart

  useEffect(() => {
    setIsEqualBatch(false)
    setMessageErr("")
    posts.filter((item) => {
      let getDateStartFormat = moment(item.dateStart).format('YYYY-MM-DD')
      if (getDateStartFormat === newDateStart) {
        setIsEqualBatch(true)
        setMessageErr("#messageErr")
      }
    })
  }, [newDateStart])

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      nameCoure: addFormData.nameCoure,
      dateStart: addFormData.dateStart,
      dateEnd: addFormData.dateEnd,
      status: addFormData.status,
      kindOfInternship: addFormData.kindOfInternship,
    };

    // equal to dateStart
    if (isEqualBatch === false) {
      apiaxios.batchCreate("internshipcourse/create", newContact).then((res) => {
        if (res) {
          history.push(`/Home/batch/?id=${res.data.idInternshipCourse}`);
        }
      }).catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: 'error',
            text: error.response.data.error,
            confirmButtonText: "Xác nhận",
          })
        } else if (error.request) {
          Swal.fire({
            icon: 'error',
            text: error.request,
            confirmButtonText: "Xác nhận",
          })
        } else {
          console.log('Error', error.message);
          Swal.fire({
            icon: 'error',
            text: error.message,
            confirmButtonText: "Xác nhận",
          })
        }
      });
    }

  };
  const handleSubmit = () => {
    try {
      if (idTemp !== undefined) {
        history.push(`/Home/batch/?id=${idTemp}`);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Bạn cần chọn Batch !',
          confirmButtonText: "Xác nhận",
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response.status.error,
      })
    }
  };

  return (
    <div>
      <div
        id="load"
        style={{ display: "block" }}
        className="modal"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header batch">
              <h4>Hệ thống quản lý thực tập</h4>
            </div>
            <div className="modal-body">
              <label className="label-batch">Chọn khóa thực tập : </label>
              <select
                className="select-batch"
                onChange={(e) => setIdTemp(e.currentTarget.value)}
              >
                <option disabled selected hidden>Chọn...</option>
                {posts?.map((item) => (
                  <option
                    key={item.idInternshipCourse}
                    value={item.idInternshipCourse}
                  >
                    {item.nameCoure}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                id="md-them1"
                type="button"
                className="btn btn-primary btn-Batch"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                style={{ marginLeft: "20px" }}
              >
                Thêm
              </button>
              <button
                onClick={handleSubmit}

                id="md-sumit"
                type="submit"
                className="btn btn-primary btn-Batch"
                style={{ marginLeft: "30px" }}

              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 style={{ textAlign: "center", color: "#1aa3ff" }}>KHÓA THỰC TẬP</h1>
        <div className="container">
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-lg"
              role="document"
              style={{ width: "700px", marginTop: "100px" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h4
                    id="exampleModalLongTitle"
                  >
                    THÊM KHÓA THỰC TẬP
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleAddFormSubmit}>
                    <tr>
                      <td>
                        <label>Khóa thực tập :</label>
                      </td>
                      <td>
                        <input
                          className="inputText"
                          type="text"
                          name="nameCoure"

                          placeholder="VD: Batch 1"
                          onChange={handleAddFormChange}
                        />
                      </td>
                      <td style={{ paddingLeft: "20px" }}>
                        <label>Trạng thái : </label>
                      </td>
                      <td>
                        <select
                          className="inPut-Batch"
                          name="status"
                          id="cars"
                          onChange={handleAddFormChange}
                        >
                          <option disabled selected hidden>Chọn...</option>
                          <option value="Done">Done</option>
                          <option value="In progress">In progress</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Ngày bắt đầu :</label>
                      </td>
                      <td>
                        <input
                          className="inputDay"
                          style={{ width: "200px" }}
                          type="date"
                          name="dateStart"
                          min={dateStart}
                          onChange={handleAddFormChange}
                        ></input>
                      </td>
                      <td style={{ paddingLeft: "20px" }}>
                        <label>Loại thực tập : </label>
                      </td>
                      <td>
                        <select
                          className="inPut-Batch"
                          name="kindOfInternship"
                          id="cars"
                          onChange={handleAddFormChange}
                        >
                          <option disabled selected hidden>Chọn...</option>
                          <option value="Full time">Full time</option>
                          <option value="Part time">Part time</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Ngày kết thúc : </label>
                      </td>
                      <td>
                        <input
                          className="inputDay"
                          style={{ width: "200px" }}
                          type="date"
                          name="dateEnd"
                          min={dateEnd}
                          onChange={handleAddFormChange}
                        ></input>
                        <br></br>
                      </td>
                    </tr>
                    <div className="modal-footer">

                      <button
                        type="button"
                        className="btn btn-secondary btn-Batch-Cancel"
                        data-dismiss="modal"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary btn-Batch"
                        data-toggle="modal"
                        data-target={messageErr}
                        data-bs-dismiss="modal"
                      >
                        Thêm
                      </button>


                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade modal-fade"
            id="messageErr"
            // tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content modal-content-center" style={{ marginTop: '0', border: '1px solid black'}}>
                <div className="modal-header">
                  <div className="container d-flex pl-0">
                    <h5
                      className="modal-title ml-2"
                      id="exampleModalLabel"
                      style={{ color: "#f23a3a" }}
                    >
                      Thông báo!
                    </h5>
                  </div>

                </div>
                <div className="modal-body" style={{ textAlign: "center" }}>
                  {constTable.EQUALBATCH}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger-del"
                    data-dismiss="modal"
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
