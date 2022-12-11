import Headert from "../Header";
import Post from "../Post";
const Feed = () => {


  return (
    <div className='="w-full h-full bg-[#FAFAFA]'>
          <Headert/>

          <div className="grid w-full mx-auto grid-cols-3 gap-6 max-w-screen-lg mt-20">  
            <div className="w-full bg-grey-300 col-span-2">
                <section className="flex flex-col gap-y-6">
                    {
                        new Array(5).fill(1).map((_,i)=> (
                            <Post key={i} postIndex={i}/>
                        ))
                    }
                </section>
            </div>

          {/*  Sidebar stuff */
          }
            <div className=" fixed right-[15%] max-w-md  bg-blue-400"> 
                SIDEBAR 
            </div>
          
          </div> 
    </div>

    );
};

export default Feed