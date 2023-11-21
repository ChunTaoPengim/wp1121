import Navbar from "./_components/Navbar";
type Props = {
    children: React.ReactNode;
   
  };
  
  function Layout({ children}: Props) {
    return (
      <div className="flex h-screen w-full flex-col">

        <div className="flex w-full ">

        <div className="h-1/6 w-1/6 m-4"> 
        <button>
            <img src="http://localhost:3000/messenger.png" alt="messanger icon" className="m-4"/>
        </button>
        <p>Start chatting!!!</p>
            
        </div>
        <nav className="flex w-2/5 flex-col overflow-y-scroll border-r bg-slate-100 pb-10 ">
          <Navbar />
        </nav>

        
        {children}
        </div>
        
      </div>
    );
  }
  
  export default Layout;
  