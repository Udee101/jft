import http from '../http';
import { getHeader, getUserId, url } from './config';

const createJobListing = (data) => http.post(`${url()}/api/v1/listings`, data, getHeader())

const getJobListings = (page, search, limit) => http.get(`${url()}/api/v1/listings?page=${page}&search=${search}&limit=${limit}`);

const getListing = (listingId) => http.get(`${url()}/api/v1/listings/${listingId}`, getHeader());

const getUserListings = (page, search, limit) => http.get(`${url()}/api/v1/users/${getUserId()}/listings?page=${page}&search=${search}&limit=${limit}`, getHeader());

const updateJobListing = (payload) => http.post(`${url()}/api/v1/listings/${payload.listingId}`, payload.data, getHeader());

const deleteJobListing = (listingId) => http.delete(`${url()}/api/v1/listings/${listingId}`, getHeader())

export {createJobListing, getJobListings, getListing, getUserListings, updateJobListing, deleteJobListing };
