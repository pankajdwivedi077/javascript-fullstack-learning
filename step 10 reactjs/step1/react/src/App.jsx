import './App.css'
import Button from './components/button/Button';
import Card from './components/Card'

import Card2 from './components/Card2';
import Header from './components/header/Header';
import User from './components/User';

function App() {
  
const jobOpenings = [
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    name: "Google",
    datePosted: "3 days ago",
    tag1: "Full Time",
    pay: "$42/hour",
    location: "Bengaluru, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
    name: "Microsoft",
    datePosted: "1 day ago",
    tag1: "Full Time",
    pay: "$68/hour",
    location: "Hyderabad, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
    name: "Amazon",
    datePosted: "5 days ago",
    tag1: "Full Time",
    pay: "$51/hour",
    location: "Bengaluru, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=meta.com&sz=128",
    name: "Meta",
    datePosted: "1 week ago",
    tag1: "Full Time",
    pay: "$58/hour",
    location: "Bengaluru, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=apple.com&sz=128",
    name: "Apple",
    datePosted: "4 days ago",
    tag1: "Full Time",
    pay: "$48/hour",
    location: "Hyderabad, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=netflix.com&sz=128",
    name: "Netflix",
    datePosted: "2 weeks ago",
    tag1: "Full Time",
    pay: "$75/hour",
    location: "Mumbai, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128",
    name: "NVIDIA",
    datePosted: "6 days ago",
    tag1: "Full Time",
    pay: "$61/hour",
    location: "Pune, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=salesforce.com&sz=128",
    name: "Salesforce",
    datePosted: "3 weeks ago",
    tag1: "Full Time",
    pay: "$44/hour",
    location: "Hyderabad, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
    name: "Adobe",
    datePosted: "10 days ago",
    tag1: "Full Time",
    pay: "$49/hour",
    location: "Noida, India"
  },
  {
    brandLogo: "https://www.google.com/s2/favicons?domain=oracle.com&sz=128",
    name: "Oracle",
    datePosted: "2 weeks ago",
    tag1: "Full Time",
    pay: "$56/hour",
    location: "Bengaluru, India"
  }
];

  return (
    <>
     {/* <div className='parent'>
      <Card user='Bell' img='https://i.pinimg.com/736x/81/0f/e8/810fe879d52d69df103846465f41cb87.jpg' />
      <Card user='Aiz' img='https://i.pinimg.com/736x/90/1e/a1/901ea1301b79862387839c069987cfff.jpg' />
     </div> */}

     {/* <div className='parent'>
         {jobOpenings.map(job => (
           <Card2 key={job.name} job={job} />
         ))}
     </div> */}

     <Header />
     <Button />

    </>
  )
}

export default App
