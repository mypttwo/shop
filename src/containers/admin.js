import React from "react";
import CurrencyPage from "../components/adminCurrencyPage";

import pages from "../utils/pages";
import NFTSetupAdmin from "./adminNFTSetup";
import WallectConnect from "./wallectConnect";

class Admin extends React.Component {
  state = {
    page: pages.NFT_SETUP_ADMIN,
  };

  selectPage = (page) => {
    this.setState({ page: page });
  };

  main = () => {
    let page = <></>;
    switch (this.state.page) {
      case pages.NFT_SETUP_ADMIN:
        page = <NFTSetupAdmin></NFTSetupAdmin>;
        break;
      default:
        page = <CurrencyPage></CurrencyPage>;
    }
    return (
      <main className="main-section" style={{ height: "100vh" }}>
        {page}
      </main>
    );
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 bg-color border-0">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="https://www.ghoultoken.io/images/logo.png"
                width="30"
                height="30"
                alt=""
              />
              <div className="mx-2 d-none d-lg-block">Poltergiest Shop</div>
              {/* <small className="version text-info"> v1.0</small> */}
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span>
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                {/* <li className="nav-item lb-nav-item">
                  <a
                    className="nav-link active"
                    href="#"
                    onClick={() => this.selectPage(pages.CURRENCY_ADMIN)}
                  >
                    <span className="px-3 sidebar-item-lbl">Currencies</span>
                  </a>
                </li> */}
                <li className="nav-item lb-nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => this.selectPage(pages.NFT_SETUP_ADMIN)}
                  >
                    <span className="px-3 sidebar-item-lbl">Setup</span>
                  </a>
                </li>
              </ul>

              <form className="d-flex  lb-nav-item">
                <WallectConnect></WallectConnect>
              </form>
            </div>
          </div>
        </nav>
        {this.main()}
      </div>
    );
  }
}

export default Admin;
