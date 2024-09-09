function Loading() {
    
    
    
    return (
        <div id="loadingContainer" className="w-full h-smscreen bg-300 flex flex-col justify-center items-center">
            <div id="loadingContent" className="w-1/6 flex flex-col justify-center items-center gap-8">
                <div id="loadingAnimation" className="w-2/3 aspect-square border-4 rounded-circle border-slate-600 border-t-zinc-100 animate-spin"></div>
                <span className="text-xl">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;