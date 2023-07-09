"use client";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const userQuery = gql`
  query Query($user: ID!) {
    getUserPortfolioByUser(user: $user) {
      _id
      user
      firstName
      lastName
      title
      bio
      rate
      portfolioUrl
      githubUrl
      linkedinUrl
      available
    }
  }
`;

export default function ProfilePanel(props) {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
  };

  const { data, error, loading } = useQuery(userQuery, {
    variables: {
      user: props.user.id,
    },
  });

  if (loading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  } else if (error) {
    return (
      <main>
        <p>{JSON.stringify(error)}</p>
      </main>
    );
  } else {
    const userData = data.getUserPortfolioByUser;
    return (
      <>
        <div className="flex flex-col">
          {/* Edit and Save Button */}
          <button
            onClick={handleEditClick}
            className={`flex items-center justify-end text-lg font-primary pt-5 pr-5 md:pr-0 w-fit ml-auto ${
              isEditable ? "hidden" : ""
            } `}
          >
            <div className="delay-75 duration-300 rounded-lg flex items-center gap-3">
              <p className="flex gap-1">
                Edit<span className="hidden md:flex">Profile</span>
              </p>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="bg-brand-accent/5 hover:bg-brand-accent/10 delay-75 duration-300 text-brand-accent p-2 rounded-lg w-5 h-5"
              />
            </div>
          </button>
          <button
            onClick={handleSaveClick}
            className={`flex items-center justify-end text-lg font-primary pt-5 pr-5 md:pr-0 w-fit ml-auto ${
              isEditable ? "" : "hidden"
            } `}
          >
            <div className="delay-75 duration-300 rounded-lg flex items-center gap-3">
              <p className="flex gap-1">
                Save<span className="hidden md:flex">Changes</span>
              </p>
              <FontAwesomeIcon
                icon={faFloppyDisk}
                className="bg-brand-secondary/5 hover:bg-brand-secondary/10 delay-75 duration-300 text-brand-secondary p-2 rounded-lg w-5 h-5"
              />
            </div>
          </button>
          {/* Form */}
          <form className="flex flex-col gap-2 p-5 pt-0 md:p-0">
            <div className="flex">
              {/* First and Last Name Field */}
              <div className="flex flex-col w-1/2">
                <label className="text-sm md:text-base">First Name</label>
                <input
                  className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg ${
                    isEditable
                      ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                      : "bg-transparent outline-none"
                  }`}
                  type="text"
                  value={userData.firstName}
                  handleChange={(e) => setFirstName(e.target.value)}
                  readOnly={!isEditable}
                ></input>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-sm md:text-base">Last Name</label>
                <input
                  className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg  ${
                    isEditable
                      ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                      : "bg-transparent outline-none"
                  }`}
                  type="text"
                  value={userData.lastName}
                  handleChange={(e) => setLastName(e.target.value)}
                  readOnly={!isEditable}
                ></input>
              </div>
            </div>
            {/* Title Field */}
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Title</label>
              <input
                className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg  ${
                  isEditable
                    ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                    : "bg-transparent outline-none"
                }`}
                type="text"
                value={userData.title}
                handleChange={(e) => setTitle(e.target.value)}
                readOnly={!isEditable}
              ></input>
            </div>
            {/* Rate Field */}
            <div className="flex flex-col w-fit">
              <label className="text-sm md:text-base">Rate</label>
              <input
                className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg  ${
                  isEditable
                    ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                    : "bg-transparent outline-none"
                }`}
                type="number"
                value={userData.rate}
                handleChange={(e) => setRate(e.target.value)}
                readOnly={!isEditable}
              ></input>
            </div>
            {/* Bio Field */}
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Bio</label>
              <textarea
                className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg  ${
                  isEditable
                    ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                    : "bg-transparent outline-none"
                }`}
                rows="5"
                value={userData.bio}
                handleChange={(e) => setBio(e.target.value)}
                readOnly={!isEditable}
              ></textarea>
            </div>
            {/* Portfolio Field */}
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Portfolio URL</label>
              <input
                className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg  ${
                  isEditable
                    ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                    : "bg-transparent outline-none"
                }`}
                type="url"
                value={userData.portfolioUrl}
                handleChange={(e) => setPortfolioUrl(e.target.value)}
                readOnly={!isEditable}
              ></input>
            </div>
            {/* Github Field */}
            <div className="flex flex-col">
              <label className="text-sm md:text-base">GitHub URL</label>
              <input
                className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg  ${
                  isEditable
                    ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                    : "bg-transparent outline-none"
                }`}
                type="url"
                value={userData.githubUrl}
                handleChange={(e) => setGithubUrl(e.target.value)}
                readOnly={!isEditable}
              ></input>
            </div>
            {/* LinkedIn Field */}
            <div className="flex flex-col">
              <label className="text-sm md:text-base">LinkedIn URL</label>
              <input
                className={`font-primary text-brand-textHeader text-base md:text-lg my-1 mr-4 px-2 -mx-2 rounded-lg  ${
                  isEditable
                    ? "bg-brand-primary/50 caret-brand-accent outline-none border-none"
                    : "bg-transparent outline-none"
                }`}
                type="url"
                value={userData.linkedinUrl}
                handleChange={(e) => setLinkedinUrl(e.target.value)}
                readOnly={!isEditable}
              ></input>
            </div>
            {/* Availability Field */}
            <div className="flex items-center">
              <input
                className="bg-transparent font-primary text-brand-textHeader text-base md:text-lg my-1 mr-3"
                type="checkbox"
                value={userData.available}
                handleChange={(e) => setAvailable(e.target.value)}
                readOnly={!isEditable}
              />
              <label className="text-sm md:text-base">Available for Work</label>
            </div>
          </form>
        </div>
      </>
    );
  }
}
