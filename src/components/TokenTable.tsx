
import { Token } from "@/types";
import { useNavigate } from "react-router-dom";

interface TokenTableProps {
  tokens: Token[];
  showStatus?: boolean;
  showListingDate?: boolean;
}

const TokenTable = ({ tokens, showStatus = false, showListingDate = false }: TokenTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (universityId: string) => {
    navigate(`/university/${universityId}`);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 text-gray-500 font-medium">TOKEN</th>
            <th className="text-left p-4 text-gray-500 font-medium">TOKEN NAME</th>
            <th className="text-left p-4 text-gray-500 font-medium">UNIVERSITY NAME</th>
            {showListingDate && (
              <th className="text-left p-4 text-gray-500 font-medium">LISTING DATE</th>
            )}
            {showStatus && (
              <th className="text-left p-4 text-gray-500 font-medium">STATUS</th>
            )}
            <th className="text-left p-4 text-gray-500 font-medium">VOLUME</th>
            <th className="text-left p-4 text-gray-500 font-medium">TOKEN PRICE</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr
              key={token.id}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(token.universityId)}
            >
              <td className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3 flex items-center justify-center">
                  {token.image ? (
                    <img src={token.image} alt={token.symbol} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs">{token.symbol}</span>
                  )}
                </div>
                <span className="font-medium">{token.symbol}</span>
              </td>
              <td className="p-4">{token.name}</td>
              <td className="p-4 flex items-center">
                {token.image && (
                  <img
                    src={token.image}
                    alt={token.universityName}
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                )}
                <span>{token.universityName}</span>
              </td>

              {showListingDate && (
                <td className="p-4">{token.listingDate || "-"}</td>
              )}
              {showStatus && (
                <td className="p-4">
                  {token.status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${token.status === 'Presale'
                        ? 'bg-amber-100 text-amber-800'
                        : token.status === 'Token Distribution'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                      {token.status}
                    </span>
                  )}
                </td>
              )}
              <td className="p-4">{token.volume}</td>
              <td className="p-4">{token.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
