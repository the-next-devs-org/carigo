import React, { useState } from "react";
import {
  Copy,
  Clock,
  Link as LinkIcon,
  Mail,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

interface PublicLinkGeneratorProps {
  agreementId: string | number;
  customerEmail?: string;
  customerPhone?: string;
  onLinkGenerated?: (link: string) => void;
}

const PublicLinkGenerator: React.FC<PublicLinkGeneratorProps> = ({
  agreementId,
  customerEmail,
  customerPhone,
  onLinkGenerated,
}) => {
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [expiryHours, setExpiryHours] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Call your backend API to generate the token
  const generateLink = async () => {
    setIsGenerating(true);

    try {
      // Replace with your actual API base URL
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_BASE_URL}/api/agreements/${agreementId}/public-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expiryHours }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setGeneratedLink(data.data.publicLink);

        if (onLinkGenerated) {
          onLinkGenerated(data.data.publicLink);
        }
      } else {
        throw new Error(data.message || "Failed to generate link");
      }

      toast.success("Public signing link generated!");
    } catch (error) {
      toast.error("Failed to generate link");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const sendViaEmail = async () => {
    if (!customerEmail) {
      toast.error("Customer email not available");
      return;
    }

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_BASE_URL}/api/agreements/${agreementId}/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: customerEmail,
            expiryHours,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Signing link sent to ${customerEmail}!`);
      } else {
        throw new Error(data.message || "Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  const sendViaSMS = async () => {
    if (!customerPhone) {
      toast.error("Customer phone not available");
      return;
    }

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_BASE_URL}/api/agreements/${agreementId}/send-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: customerPhone,
            expiryHours,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Signing link sent to ${customerPhone}!`);
      } else {
        throw new Error(data.message || "Failed to send SMS");
      }
    } catch (error) {
      toast.error("Failed to send SMS");
    }
  };

  const formatExpiryTime = () => {
    if (expiryHours === 1) return "1 hour";
    if (expiryHours < 24) return `${expiryHours} hours`;
    const days = Math.floor(expiryHours / 24);
    const remainingHours = expiryHours % 24;
    if (remainingHours === 0) return `${days} day${days > 1 ? "s" : ""}`;
    return `${days} day${days > 1 ? "s" : ""} ${remainingHours} hour${
      remainingHours > 1 ? "s" : ""
    }`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <LinkIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Generate Public Signing Link
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link Expiry Time
          </label>
          <select
            value={expiryHours}
            onChange={(e) => setExpiryHours(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={0.5}>30 minutes</option>
            <option value={1}>1 hour</option>
            <option value={2}>2 hours</option>
            <option value={6}>6 hours</option>
            <option value={24}>24 hours</option>
            <option value={72}>3 days</option>
            <option value={168}>1 week</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Link will be valid for {formatExpiryTime()}
          </p>
        </div>

        <button
          onClick={generateLink}
          disabled={isGenerating}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Clock className="w-4 h-4" />
              Generate Temporary Link
            </>
          )}
        </button>

        {generatedLink && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 flex items-center"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              {customerEmail && (
                <button
                  onClick={sendViaEmail}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Send via Email
                </button>
              )}

              {customerPhone && (
                <button
                  onClick={sendViaSMS}
                  className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send via SMS
                </button>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> This link will expire in{" "}
                {formatExpiryTime()}. The customer must complete their signature
                before the expiry time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLinkGenerator;
