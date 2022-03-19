import { Toaster } from "react-hot-toast";

export const SiteToaster = () => {
    return (
        <Toaster
            toastOptions={{
                position: "bottom-right",
                success: {
                    style: {
                        background: "#00ff003d",
                    },
                    duration: 2000,
                },
                error: {
                    style: {
                        backgroundColor: "#c705053d",
                    },
                    duration: 2000,
                },
            }}
        />
    );
};
