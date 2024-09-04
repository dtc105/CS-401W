function Loading() {
    
    
    
    return (
        <div className="w-full h-full grid place-items-center">
            <div>
                <div id="loadingIcon" className="m-4 aspect-square border-4 rounded-circle border-zinc-600 border-t-zinc-100 border-opacity-75 animate-spin"></div>
                <p className="m-4 text-xl">Loading...</p>
            </div>
        </div>
    );
}

export default Loading;