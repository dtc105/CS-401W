/**
 * Home/Landing page of the site
 * @returns page
 */
function Home() {
    
    return (
        <>
            <hgroup className="flex h-fit flex-col flex-start gap-4">
                <h1 className="text-6xl font-bold">An innovative way to keep <br></br> everyone in sync.</h1>
                <p className="text-xl">Keep yourself and other up-to-date on future planned events or changes <br></br> to already existing plans with just a few clicks.</p>
                <img src='\assets\examplePlanner.jpg' className='flex p-1 h-4/5 w-4/5' ></img>
            </hgroup>
        </>
    );
}

export default Home;