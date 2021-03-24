import React, { Component } from "react";
import TheaterTable from "../view/tables/theaterTable";
import cityService from "../../service/cityService";
import theaterService from "../../service/theaterService";
import vendorService from "../../service/vendorService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import { toast } from "react-toastify";
import _ from "lodash";
import AutocompleteInput from "../common/autocompleteInput";
import { Button, Grid, Paper } from "@material-ui/core";

export class Theaters extends Component {
  state = {
    pageTitle: "WELCOME",
    allTheaters: [],
    theaters: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    try {
      if (localStorage.getItem("role") === "ROLE_VENDOR") {
        vendorService
          .getVendorByUserName(localStorage.getItem("username"))
          .then((res) => {
            localStorage.setItem("userId", res.data.id);
            this.setState({
              theaters: res.data.theaters,
              allTheaters: res.data.theaters,
            });
            this.setState({ pageTitle: "Theaters under vendor" });
          });
      } else if (
        !_.isUndefined(this.props.match.params.cityId) &&
        this.props.match.params.cityId !== null
      ) {
        const cityId = this.props.match.params.cityId;
        cityService.getCity(cityId).then((res) => {
          this.setState({
            theaters: res.data.theaters,
            allTheaters: res.data.theaters,
          });
          this.setState({ pageTitle: `Theaters in city  ${res.data.pincode}` });
        });
      } else {
        theaterService.getAllTheaters().then((res) => {
          this.setState({
            theaters: res.data.theaters,
            allTheaters: res.data.theaters,
          });
          this.setState({ pageTitle: "All theater" });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleTheaterForm = () => {
    this.props.history.push({
      pathname: `/theater-form`,
    });
  };

  handleSuccess = (message) => {
    toast(message);
    window.location.reload();
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleDelete = (theater) => {
    theaterService.removeTheater(theater.id).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleUpdate = (theater) => {
    console.log(theater);
    this.props.history.push({
      pathname: `/theater/${theater.id}/theater-form`,
      state: { theater: theater },
    });
  };

  handleTheaterSelect = (event, theater) => {
    let a = {};
    if (_.isNull(theater)) {
      a = { ...this.state.allTheaters };
      this.setState({ theaters: a });
    } else {
      a = [theater];
      this.setState({ theaters: a });
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, theaters } = this.state;

    const sorted = _.orderBy(theaters, [sortColumn.path], [sortColumn.order]);

    const filteredTheaters = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredTheaters.length, data: filteredTheaters };
  };

  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_VENDOR") {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => this.handleTheaterForm()}
        >
          Add Theater
        </Button>
      );
    }
  };

  render() {
    const {
      pageTitle,
      pageSize,
      currentPage,
      sortColumn,
      allTheaters,
    } = this.state;

    const { totalCount, data: filteredTheaters } = this.getPagedData();

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <Paper>
              {" "}
              <AutocompleteInput
                data={allTheaters}
                label={"theaterName"}
                onItemSelect={this.handleTheaterSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              <div className="col py-3 px-lg-5  bg-light">
                {this.handleRole()}
                <TheaterTable
                  theaters={filteredTheaters}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onUpdate={this.handleUpdate}
                  onSort={this.handleSort}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Theaters;
