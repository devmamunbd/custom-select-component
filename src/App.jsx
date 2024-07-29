import CustomSelect from './CustomSelect/CustomSelect'
// eslint-disable-next-line no-unused-vars
const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const groupedOptions = [
  {
    label: 'Language',
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'ruby', label: 'Ruby'},
      { value: 'go', label: "Go"}
    ],
  },
  {
    label: 'Technology',
    options: [
      { value: 'reactjs', label: 'React JS' },
      { value: 'nextjs', label: 'Next JS' },
      { value: 'typescript', label: "TypeScript"},
      { value: 'laravel', label: 'Laravel'},
      { value: 'django', label: "Django"}
    ],
  },
  {
    label: 'Tools',
    options: [
      {value: 'git', label: 'Git'},
      {value: 'github', label: 'Github'},
      {value: 'vercel', label: 'Vercel'},
      {value: 'react router dom', label: 'React Router Dom'}
    ]
  }
];

const App = () => {
  // const options =[
  //   {value: "HTML", label: "HTML"},
  //   {value: "CSS", label: "CSS"},
  //   {value: "JavaScript", label: "JavaScript"},
  //   {value: "ReactJS", label: "ReactJS"},
  //   {value: "NodeJS", label: "NodeJS"},
  //   {value: "MongoDB", label: "MongoDB"},
  //   {value: "ExpressJS", label: "ExpressJS"},
  //   {value: "Tailwind CSS", label: "Tailwind CSS"},
  //   {value: "DaySi UI", label: "DaySi UI"},
  // ]
  return (
    <div className="kzui-body">
      <div className='kzui-title'>
      <h1>Custom Select Component</h1>
      </div>
    <CustomSelect
    isClearable
    isSearchable
    isDisabled={false}
    options={groupedOptions}
    value={null}
    placeholder="Select an option"
    isGrouped
    isMulti
    onChangeHandler={(val) => console.log(val)}
    onMenuOpen={() => console.log('Menu opened')}
    onSearchHandler={(text) => console.log(text)}
    >

    </CustomSelect>

    </div>
  )
}

export default App