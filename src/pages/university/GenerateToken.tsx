import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const GenerateToken = ({ id }) => {
    return (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-start space-x-5">
                <img
                    src="/uploads/Frame.png"
                    alt="UFT Logo"
                    className="w-12 h-12"
                />
                <div>
                    <h2 className="text-xl font-semibold mb-1">Launch UFT Token</h2>
                    <p className="text-gray-600 text-sm">
                        Create a custom university token backed by blockchain. Enable secure verifiable digital assets for your institution.
                    </p>
                </div>
            </div>
            <Link to={`/university/${id}/create-token`} className="w-full md:w-auto">
                <Button className="bg-krida-dark text-white hover:bg-krida-dark/90 rounded-full w-full md:w-auto">
                    Generate Token
                </Button>
            </Link>
        </div>
    )
}