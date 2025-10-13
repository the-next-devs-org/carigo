import React, { useState } from "react";
import {
  Copy,
  Clock,
  Link as LinkIcon,
  Mail,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  generatePublicSigningLink,
  generateRegularSigningLink,
} from "../utils/publicSigningUtils";

interface SigningLinkManagerProps {
  agreementId: string | number;
  customerEmail?: string;
  customerPhone?: string;
  showRegularLink?: boolean;
  onLinkGenerated?: (link: string, isPublic: boolean) => void;
}

const SigningLinkManager: React.FC<SigningLinkManagerProps> = ({
  agreementId,
  customerEmail,
  customerPhone,
  showRegularLink = true,
  onLinkGenerated,
}) => {
  const [publicLink, setPublicLink] = useState<string>("");
  const [expiryHours, setExpiryHours] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Regular signing link for logged-in users
  const regularLink = generateRegularSigningLink(agreementId);

  // Generate public link (this would normally call backend to get token)
  const generatePublicLink = async () => {
    setIsGenerating(true);

    try {
      // In a real implementation, you'd call your backend to generate the token
      // For demo purposes, we'll use a mock token
      const mockToken = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const link = generatePublicSigningLink(
        agreementId,
        mockToken,
        expiryHours
      );
      setPublicLink(link);

      if (onLinkGenerated) {
        onLinkGenerated(link, true);
      }

      toast.success("Public signing link generated!");
    } catch (error) {
      toast.error("Failed to generate link");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (link: string, type: string) => {
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      toast.success(`${type} link copied to clipboard!`);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const sendViaEmail = async (link: string, isPublic: boolean) => {
    if (!customerEmail || !link) {
      toast.error("Customer email not available");
      return;
    }

    // In a real implementation, call your backend to send email
    const linkType = isPublic ? "Public signing" : "Regular signing";
    toast.success(`${linkType} link would be sent to ${customerEmail}`);
  };

  const sendViaSMS = async (link: string, isPublic: boolean) => {
    if (!customerPhone || !link) {
      toast.error("Customer phone not available");
      return;
    }

    // In a real implementation, call your backend to send SMS
    const linkType = isPublic ? "Public signing" : "Regular signing";
    toast.success(`${linkType} link would be sent to ${customerPhone}`);
  };

  const openLink = (link: string) => {
    window.open(link, "_blank");
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <LinkIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Signing Links for Agreement #{agreementId}
        </h3>
      </div>

      {/* Regular Signing Link */}
      {showRegularLink && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Regular Signing Link (Requires Login)
          </h4>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={regularLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
            />
            <button
              onClick={() => copyToClipboard(regularLink, "Regular")}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 flex items-center"
            >
              <Copy className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => openLink(regularLink)}
              className="px-3 py-2 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 flex items-center"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          <div className="flex gap-2">
            {customerEmail && (
              <button
                onClick={() => sendViaEmail(regularLink, false)}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                Send via Email
              </button>
            )}

            {customerPhone && (
              <button
                onClick={() => sendViaSMS(regularLink, false)}
                className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Send via SMS
              </button>
            )}
          </div>
        </div>
      )}

      {/* Public Signing Link */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">
          Public Signing Link (No Login Required)
        </h4>

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
            onClick={generatePublicLink}
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
                Generate Public Link
              </>
            )}
          </button>

          {publicLink && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={publicLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(publicLink, "Public")}
                  className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 flex items-center"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => openLink(publicLink)}
                  className="px-3 py-2 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 flex items-center"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </button>
              </div>

              <div className="flex gap-2">
                {customerEmail && (
                  <button
                    onClick={() => sendViaEmail(publicLink, true)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Send via Email
                  </button>
                )}

                {customerPhone && (
                  <button
                    onClick={() => sendViaSMS(publicLink, true)}
                    className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send via SMS
                  </button>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This public link will expire in{" "}
                  {formatExpiryTime()}. The customer can sign without logging in
                  using this link.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigningLinkManager;
