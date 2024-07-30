/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
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
  const [selectedValue, setSelectedValue] = useState(value || (isMulti ? [] : null));
  const [searchText, setSearchText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setSelectedValue(value || (isMulti ? [] : null));
  }, [value, isMulti]);

  const handleSelect = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.find(val => val.value === option.value)) {
        newValue = selectedValue.filter(val => val.value !== option.value);
      } else {
        newValue = [...selectedValue, option];
      }
      setSelectedValue(newValue);
    } else {
      newValue = option;
      setSelectedValue(newValue);
      setMenuOpen(false);
    }
    onChangeHandler(newValue);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (isMulti) {
      const newValue = [];
      setSelectedValue(newValue);
      onChangeHandler(newValue);
    } else {
      setSelectedValue(null);
      onChangeHandler(null);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onSearchHandler(e.target.value);
  };

  const toggleMenu = () => {
    if (!isDisabled) {
      setMenuOpen(!menuOpen);
      if (!menuOpen) {
        onMenuOpen();
      }
    }
  };

  const filteredOptions = isGrouped
    ? options.map(group => ({
        ...group,
        options: group.options.filter(option =>
          option.label.toLowerCase().includes(searchText.toLowerCase())
        ),
      })).filter(group => group.options.length > 0)
    : options.filter(option =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );


  return (
  <div className='kzui-main'>
         <div className={`kzui-select ${isDisabled ? 'kzui-select--disabled' : ''}`}>
      <div className="kzui-select__control" onClick={toggleMenu}>
        {isSearchable && menuOpen ? (
          <input
            type="text"
            className="kzui-select__search"
            value={searchText}
            onChange={handleSearch}
            placeholder={placeholder}
            disabled={isDisabled}
          />
        ) : (
          <div className="kzui-select__value">
            {isMulti
              ? selectedValue.map(val => val.label).join(', ')
              : selectedValue?.label || placeholder}
          </div>
        )}
        {isClearable && selectedValue && (
          <button className="kzui-select__clear" onClick={handleClear}>Clear</button>
        )}
      </div>
      {menuOpen && (
        <div className="kzui-select__menu">
          {isGrouped
            ? filteredOptions.map(group => (
                <div key={group.label} className="kzui-select__group">
                  <div className="kzui-select__group-label">{group.label}</div>
                  {group.options.map(option => (
                    <div
                      key={option.value}
                      className={`kzui-select__option ${isMulti && selectedValue.some(val => val.value === option.value) ? 'kzui-select__option--selected' : ''}`}
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              ))
            : filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={`kzui-select__option ${isMulti && selectedValue.some(val => val.value === option.value) ? 'kzui-select__option--selected' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default CustomSelect;
