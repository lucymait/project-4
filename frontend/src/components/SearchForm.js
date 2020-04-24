import React from 'react'

const SearchForm = ({ query, onChange }) => {
  return (
    <div className="SearchForm">
      <div className="container">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-medium"
              type="text"
              name="search"
              placeholder="Search..."
              value={query}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default SearchForm