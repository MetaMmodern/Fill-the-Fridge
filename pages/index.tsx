import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYsL3NtRxHucdRBUKgnmP5m0QQcTnjM3s&libraries=places"></script>
      </Head>

      <div className="container mt-4">
        <div className="d-flex flex-row justify-content-between">
          <h3 className="font-weight-bold">
            <a href="/" className="text-black">
              Fill the Fridge
            </a>
          </h3>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <button className="btn btn-success cleaner ml-3">Clear the Fridge</button>
            <button className="help text-black ml-3 mr-1 bg-white border-0">?</button>
          </div>
        </div>
      </div>
      <div className="container h-100 mt-4">
        <form className="form-inline w-100 tag-container">
          <input type="text" className="form-control" id="inputIngredients" />
          <button type="submit" className="btn btn-primary submit">
            Search recieps
          </button>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-4" id="reloading"></div>
      <div className="container mt-4 container-infinite">
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3"
          id="search-results-container"
        ></div>
        <div className="d-flex justify-content-center" id="loading"></div>
      </div>
      <div className="container container-popup"></div>
    </div>
  );
};

export default Home;