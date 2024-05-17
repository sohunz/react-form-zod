import loading from "../assets/loading.svg";

const Loading = () => {
    return (
        <div className="flex items-center gap-1">
            <p>Submiting </p>
            <img src={loading} className="w-[25px]" />
        </div>
    );
};

export default Loading;
