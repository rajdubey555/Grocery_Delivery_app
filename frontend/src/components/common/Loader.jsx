const Loader = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                    <p className="text-primary-600 font-medium text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;