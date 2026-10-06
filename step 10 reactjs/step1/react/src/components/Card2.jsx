import { Bookmark } from 'lucide-react';

const Card2 = ({job}) => {

  return (
     <div className="card">
           <div>
            <div className="top">
            <img src={job.brandLogo} alt="" />
            <button>Save <Bookmark size={10} /> </button>
           </div>
           <div className='center'>
               <h3>{job.name} <span>{job.datePosted}</span> </h3>
               <div className='tag'>
                <h4>{job.tag1}</h4>
               </div>
           </div>
           </div>
           <div className="bottom">
                <div>
                
                    <h3>{job.pay}</h3>
                    <p>{job.location}</p>
                 
                </div>
                  <button>Apply Now</button>
           </div>
         </div>
  )
}

export default Card2