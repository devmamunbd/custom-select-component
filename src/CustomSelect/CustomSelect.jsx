/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../CustomSelect/Styles.css'

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler
}) => {
  const [selectedValue, setSelectedValue] = useState(value || []);
  const [searchText, setSearchText] = useState('');

  const handleSelect = (option) => {
    
    console.log(option)

    if (isMulti) {
      setSelectedValue((prev) => [...prev, option]);
    } else {
      setSelectedValue(option);
    }
    onChangeHandler(option);


  };


  const handleClear = () => {
    setSelectedValue(isMulti ? [] : null);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onSearchHandler(e.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
  <div className='kzui-main'>
      <div className={`kzui-select ${isDisabled ? 'kzui-select--disabled' : ''}`}>
      <div className="kzui-select__control" onClick={onMenuOpen}>
        {isSearchable && (
          <input
            type="text"
            className="kzui-select__search"
            value={searchText}
            onChange={handleSearch}
            placeholder={selectedValue ? '' : placeholder}
            disabled={isDisabled}
          />
        )}
        {!isSearchable && selectedValue && (
          <div className="kzui-select__value">{selectedValue.label}</div>
        )}
        {isClearable && selectedValue && (
          <button className="kzui-select__clear" onClick={handleClear}>Clear</button>
        )}
      </div>
      <div className="kzui-select__menu">
        {isGrouped
          ? options.map(group => (
              <div key={group.label} className="kzui-select__group">
                <div className="kzui-select__group-label">{group.label}</div>
                {group.options.map(option => (
                  <div key={option.value} className="kzui-select__option" onClick={() => handleSelect(option)}>
                    {option.label}
                  </div>
                ))}
              </div>
            ))
          : filteredOptions.map(option => (
              <div key={option.value} className="kzui-select__option" onClick={() => handleSelect(option)}>
                {option.label}
              </div>
            ))}
      </div>
    </div>
  </div>
  );
};

export default CustomSelect;
