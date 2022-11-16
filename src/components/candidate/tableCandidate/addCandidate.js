import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as apiaxios from "../../../api/service";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ReusableDialog from "../../componentsReuse/reusableDialog";

export default function AddCandidate(props) {
  const { register, handleSubmit, reset } = useForm();

  const [certificationDate, setCertificationDate] = useState("");
  const [preferredInternshipStartDate, setInterShipStartDate] = useState("");

  const [candi, setCandi] = useState([]);
  const today = new Date();
  const idBatch = localStorage.getItem("idBatch");

  const handleClose = () => {
    props.setOpenAdd(false);
  };
  const statusaass = "Waiting for results";
  const onSubmitAdd = (data) => {
    const certiDate = dayjs(certificationDate).format("YYYY/MM/DD");
    const internShipDate = dayjs(preferredInternshipStartDate).format(
      "YYYY/MM/DD"
    );

    data.certificationDate = certiDate;
    data.preferredInternshipStartDate = internShipDate;
    data.idInternshipCourse = idBatch;
    data.status = statusaass;
    apiaxios
      .candidatePost("candidate/create", data)
      .then((res) => {
        const newCadidates = [data, ...candi];
        setCandi(newCadidates);
        props.fetchCandi();
        reset();
        setCertificationDate("");
        setInterShipStartDate("");
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            text: error.response.data.error,
            confirmButtonText: "Xác nhận",
          });
        } else if (error.request) {
          Swal.fire({
            icon: "error",
            text: error.request,
            confirmButtonText: "Xác nhận",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
    handleClose();
  };

  const title = "Thêm ứng viên";
  const children = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography sx={{ ml: 1, fontWeight: 600 }}>
        Thông tin cá nhân:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Họ tên"
          size="small"
          defaultValue=""
          name="fullName"
          {...register("fullName")}
        />
        <TextField
          required
          id="outlined-required"
          label="Số điện thoại"
          size="small"
          defaultValue=""
          name="tel"
          {...register("tel")}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          size="small"
          defaultValue=""
          name="emailCandidate"
          {...register("emailCandidate")}
        />
      </div>
      <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
        Thông tin trường:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Mã sinh viên"
          size="small"
          defaultValue=""
          name="studentID"
          {...register("studentID")}
        />
        <TextField
          required
          id="outlined-required"
          label="Ngành học"
          size="small"
          defaultValue=""
          name="faculty"
          {...register("faculty")}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Trường học"
          defaultValue=""
          name="university"
          {...register("university")}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Sinh viên năm"
          size="small"
          defaultValue=""
          name="currentYearofStudy"
          {...register("currentYearofStudy")}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Điểm TB (Hệ 10)"
          defaultValue=""
          name="GPA"
          {...register("GPA")}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Năm tốt nghiệp"
          defaultValue=""
          name="graduationYear"
          {...register("graduationYear")}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Dự kiến tốt nghiệp"
          defaultValue=""
          name="expectedGraduationSchedule"
          {...register("expectedGraduationSchedule")}
        />

        <TextField
          required
          id="outlined-required"
          size="small"
          label="Môn học còn lại"
          defaultValue=""
          name="remainingSubjects"
          {...register("remainingSubjects")}
        />

        <TextField
          required
          id="outlined-required"
          size="small"
          label="Dự án đã tham gia"
          defaultValue=""
          name="projectExperience"
          {...register("projectExperience")}
        />
      </div>
      <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
        Thông tin thực tập:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Vị trí thực tập"
          defaultValue=""
          name="internshipDomain"
          {...register("internshipDomain")}
        />

        <FormControl
          sx={{ m: 1, minWidth: 200 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Thời gian thực tập</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Thời gian thực tập"
            name="preferredInternshipDuration"
            {...register("preferredInternshipDuration")}
          >
            <MenuItem value="8 weeks">8 tuần</MenuItem>;
            <MenuItem value="12 weeks">12 tuần</MenuItem>;
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1, minWidth: 200 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Loại thực tập</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Loại thực tập"
            name="internshipSchedule"
            {...register("internshipSchedule")}
          >
            <MenuItem value="Full time">Full time</MenuItem>;
            <MenuItem value="Part time">Part time</MenuItem>;
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Kĩ năng"
          defaultValue=""
          name="preferredSkills"
          {...register("preferredSkills")}
        />

        <FormControl
          sx={{ m: 1, minWidth: 200 }}
          size="small"
          required
          id="outlined-required"
        >
          <InputLabel htmlFor="grouped-select">Loại PC</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Loại PC"
            name="pcType"
            {...register("pcType")}
          >
            <MenuItem value="PC">PC</MenuItem>;
            <MenuItem value="Laptop">Laptop</MenuItem>;
          </Select>
        </FormControl>
        <DesktopDatePicker
          minDate={today}
          label="Ngày thực tập"
          inputFormat="DD/MM/YYYY"
          name="preferredInternshipStartDate"
          value={preferredInternshipStartDate}
          onChange={(newValue) => {
            setInterShipStartDate(dayjs(newValue).format("MM/DD/YYYY"));
          }}
          renderInput={(params) => (
            <TextField
              required
              id="outlined-required"
              size="small"
              {...params}
            />
          )}
        />
      </div>
      <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
        Thông tin Covid:
      </Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Giấy chứng nhận"
          defaultValue=""
          name="covidVaccinationCertificate"
          {...register("covidVaccinationCertificate")}
        />

        <DesktopDatePicker
          label="Ngày chứng nhận"
          maxDate={today}
          inputFormat="DD/MM/YYYY"
          value={certificationDate}
          name="certificationDate"
          onChange={(newValue) => {
            setCertificationDate(dayjs(newValue).format("MM/DD/YYYY"));
          }}
          renderInput={(params) => (
            <TextField
              required
              id="outlined-required"
              size="small"
              {...params}
            />
          )}
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          label="Tiêm chủng Covid"
          defaultValue=""
          name="covidVaccinationiInformation"
          {...register("covidVaccinationiInformation")}
        />
      </div>
    </LocalizationProvider>
  );
  const button = (
    <Button variant="contained" type="submit" autoFocus>
      Thêm
    </Button>
  );
  return (
    <ReusableDialog
      isOpen={props.openAdd}
      handleClose={handleClose}
      title={title}
      onSubmit={handleSubmit(onSubmitAdd)}
      children={children}
      button={button}
    />
  );
}
