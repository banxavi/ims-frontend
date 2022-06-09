import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import BasicForm from "../components/login/Form";
import { useSelector } from "react-redux";
import "../asset/css/navbar.css";
import "../asset/css/header.css";
import "../asset/css/crudModal.css";
import "../asset/css/tableCandidate.css";
import "../asset/css/pagination.css";
import "../asset/css/interviewShedule.css";
import "../asset/css/mentor.css";
import "../asset/css/interview.css";
import "../asset/css/dg.css";
import Navbar from "../components/home/navbar/index";
import Header from "../components/home/header/index";
import indexCandidate from "../components/candidate/tableCandidate/index";
import indexMentor from "../components/table/mentor/index";
import indexStudent from "../components/table/student/index";
import Home from "../components/table/home/index";
import Batch from "../components/main/batch/index";
import Interview from "../components/table/interview/search/index";
import Internships from "../components/table/internships/index";
import DG from "../components/dg/table/index";
function App() {
  const isAuthen = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!isAuthen && <Redirect to="/login" />}
          {isAuthen && <Redirect to="/batch" />}
        </Route>
        <Route path="/login" exact>
          <BasicForm />
        </Route>
        {isAuthen && (
          <>
            <Header />
            <Navbar />
            <Switch>
              <Route>
                <Route path="/candidate" exact component={indexCandidate} />
                <Route path="/mentor" exact component={indexMentor} />
                <Route path="/student" exact component={indexStudent} />
                <Route path="/home/batch" exact component={Home} />
                <Route path="/batch" exact component={Batch} />
                <Route path="/interview" exact component={Interview} />
                <Route path="/internshipcourse" exact component={Internships} />
                <Route path="/dg" exact component={DG} />
              </Route>
            </Switch>
          </>
        )}

        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
