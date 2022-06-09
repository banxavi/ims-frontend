import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { popUpActions } from "../../../redux/store/popup";
import DayJS from "react-dayjs";

const Preview = () => {
  const showPopUp = useSelector((state) => state.popup.showPreview);
  const showData = useSelector((state) => state.data.dataPreview);
  const dispatch = useDispatch();
  const hidePreview = () => {
    dispatch(popUpActions.hidePreview());
    dispatch(popUpActions.show());
  };
  return (
    <Modal show={showPopUp}>
      <ModalHeader>
        <div>
          <h4>XEM TRƯỚC NỘI DUNG KHI GỬI</h4>
        </div>
      </ModalHeader>
      <ModalBody>
        <table style={{ marginLeft: "2%" }}>
          <tr>
            <td className="left-modal2">
              <lable>Tên ứng viên:</lable>
            </td>
            <td>{showData?.name}</td>
          </tr>
          <tr>
            <td className="left-modal2">
              <lable>Email ứng viên:</lable>
            </td>
            <td>{showData?.email}</td>
          </tr>
          <tr>
            <td className="left-modal2">
              <lable>Người phỏng vấn:</lable>
            </td>
            <td>{showData?.mentor}</td>
          </tr>
          <tr>
            <td className="left-modal2">
              <lable>Email người phỏng vấn:</lable>
            </td>
            <td>{showData?.emailMentor}</td>
          </tr>
          <tr>
            <td className="left-modal2">
              <lable>Ngày phỏng vấn:</lable>
            </td>
            <td>
              <DayJS format="DD-MM-YYYY">{showData?.date}</DayJS>
            </td>
          </tr>
          <tr>
            <td className="left-modal2">
              <lable>Thời gian:</lable>
            </td>
            <td>{showData?.time}</td>
          </tr>
          <tr>
            <td className="left-modal2">
              <lable>Link phỏng vấn:</lable>
            </td>
            <td>{showData?.link}</td>
          </tr>
          <tr>
            <td className="left-modal2">
              <lable>Tiêu đề:</lable>
            </td>
            <td>{showData?.tite}</td>
          </tr>
        </table>
        <div>
          <button
            className="btn btn-danger-del"
            style={{ marginLeft: "40%", marginTop: "10%" }}
            type="button"
            onClick={hidePreview}
          >
            OK
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default Preview;
