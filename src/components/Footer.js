import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FaGithub, FaYoutube, FaFacebookSquare } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import addToMailchimp from "gatsby-plugin-mailchimp";

const FooterWrapper = styled.div`
  background-color: rgba(0, 160, 140, 0.4);
  display: flex;
  padding: 5px;

  & > :first-child {
    display: none;
  }
  /* Below desktops and laptops ----------- */
  flex-direction: column;
  justify-content: start;
  @media only screen and (min-width: 1224px) {
    align-items: center;
    flex-direction: row;
    & > :first-child {
      display: block;
      visibility: hidden;
      margin-right: auto;
    }
  }
`;

const CreatedByWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  font-family: "Roboto", sans-serif;
  text-align: center;
  /* Below desktops and laptops ----------- */
  font-size: 1em;
  /* Desktops and laptops ----------- */
  @media only screen and (min-width: 1224px) {
    font-size: 1em;
  }
`;

const LinksWrapper = styled.div`
  display: flex;

  /* Below desktops and laptops ----------- */
  justify-content: space-around;
  /* Desktops and laptops ----------- */
  @media only screen and (min-width: 1224px) {
    justify-content: flex-end;
    margin-left: auto;
    align-items: center;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  &:hover {
    color: ${(props) => props.higlightColor || "palevioletred"};
  }
  /* Below desktops and laptops ----------- */

  /* Desktops and laptops ----------- */
  @media only screen and (min-width: 1224px) {
    margin: 0 20px 0 0;
  }
`;

const NewsletterWrapper = styled.div`
  background-color: rgba(0, 160, 140, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;

  border-top: 2px solid rgba(0, 160, 140, 1);
`;

const NewsletterEmailInput = styled.input`
  width: 100%;
  float: left;
  padding: 15px 20px;
  text-align: center;
  outline: 0;
  min-width: 30vw;
`;

const NewsletterSubmitBtnWrapper = styled.input`
  background-color: rgba(0, 160, 140, 1);
  color: white;
  border: 1px solid rgba(0, 160, 140, 1);
  padding: 15px 20px;
  font-weight: bold;
`;

const NewsletterHeaderWrapper = styled.h1`
  line-height: 130%;
  letter-spacing: 0.07rem;

  text-align: center;
  padding: 0 5px;
  font-size: 1.5rem;

`;

const NewsletterFrom = styled.form`
  display: flex;

  font-family: inherit;
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  margin-top: 15px;
`;

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = { email: "", result: null };
  }
  _handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(this.state.email);
    this.setState({ result: result });
  };
  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };
  refreshForm = () => {
    this.setState({ result: null });
  };

  render() {
    return (
      <>
        <NewsletterWrapper>
          {this.state.result?.result === "success" ? (
            <NewsletterHeaderWrapper>
              Pomyślnie zapisano {this.state.email} do newslettera.
            </NewsletterHeaderWrapper>
          ) : null}
          {this.state.result?.result === "error" ? (
            <>
              <NewsletterHeaderWrapper>
                Wystąpił błąd.
              </NewsletterHeaderWrapper>

              <StyledIconWrapper
                higlightColor="blue"
                onClick={this.refreshForm}
              >
                <MdRefresh size={32} />
              </StyledIconWrapper>
            </>
          ) : null}
          {!this.state.result ? (
            <div className="subscribe">
              <NewsletterHeaderWrapper>
                Dołącz do newslettera.
              </NewsletterHeaderWrapper>

              <NewsletterFrom onSubmit={this._handleSubmit}>
                <NewsletterEmailInput
                  type="email"
                  placeholder="Twój adres email"
                  onChange={this.handleChange}
                />
                <NewsletterSubmitBtnWrapper type="submit" value="Subskrybuj" />
              </NewsletterFrom>
            </div>
          ) : null}
        </NewsletterWrapper>
        <FooterWrapper>
          <CreatedByWrapper>Workaround div</CreatedByWrapper>
          <CreatedByWrapper>
            © 2020 Created by Łukasz Zieliński.
          </CreatedByWrapper>

          <LinksWrapper>
            <StyledIconWrapper higlightColor="black">
              <FaGithub size={32} />
            </StyledIconWrapper>
            <StyledIconWrapper higlightColor="red">
              <FaYoutube size={32} />
            </StyledIconWrapper>
            <StyledIconWrapper higlightColor="blue">
              <FaFacebookSquare size={32} />
            </StyledIconWrapper>
          </LinksWrapper>
        </FooterWrapper>
      </>
    );
  }
}
