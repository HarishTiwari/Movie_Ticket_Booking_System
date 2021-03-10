package com.edac.project.service;

import com.edac.project.models.*;
import com.edac.project.models.common.ResponseResult;
import com.edac.project.models.theater.Theater;
import com.edac.project.models.movie.Movie;
import com.edac.project.models.theater.Show;
import com.edac.project.models.users.ApplicationUser;
import com.edac.project.models.users.Customer;
import com.edac.project.models.users.Vendor;

import java.util.List;

public interface CityService {

    //Vendor Registration --Start
    Vendor getVendorById(Integer vendorId);
    List<Vendor> getAllVendors();
    ResponseResult addVendor(Vendor vendor);
    ResponseResult registerVendor(Integer vendorId, ApplicationUser applicationUser);
    ResponseResult updateVendor(Integer vendorId, Vendor vendor);
    ResponseResult removeVendorById(Integer vendorId);
    //Vendor --End


    //Customer --Start
    Customer getCustomerById(Integer customerId);
    List<Customer> getAllCustomers();
    ResponseResult registerCustomer(ApplicationUser applicationUser, Customer customer);
    ResponseResult updateCustomer(Integer customerId, Customer customer);
    ResponseResult removeCustomerById(Integer customerId);
    //Customer --End


    //City --Start
    City getCityById(Integer cityId);
    List<City> getAllCities();
    ResponseResult addCity(City city);
    ResponseResult updateCity(Integer cityId, City city);
    ResponseResult removeCityById(Integer cityId);
    //City --End


    //Theater --Start
    Theater getTheaterById(Integer theaterId);
    List<Theater> getAllTheaters();
    ResponseResult addTheater(Integer cityId, Integer vendorId, Theater theater);
    ResponseResult updateTheater(Integer theaterId, Theater theater);
    ResponseResult removeTheaterById(Integer theaterId);
    //Theater Movies


    //Movie --Start
    Movie getMovieById(Integer movieId);
    List<Movie> getAllMovies();
    ResponseResult addMovieToTheater(Integer theaterId, Movie movie);
    ResponseResult updateMovie(Integer movieId, Movie movie);
    ResponseResult removeMovieFromTheater(Integer movieId);
    //Movie --End


    //Movie Show
    Show getShowById(Integer showId);
    ResponseResult addShowToTheater(Integer movieId, Show show);
    ResponseResult updateShowToTheater(Integer showId, Show show);
    ResponseResult removeShowFromTheater(Integer showId);
    //Movie --End
}
