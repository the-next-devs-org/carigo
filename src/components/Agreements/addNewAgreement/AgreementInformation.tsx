import { User } from "lucide-react";
import { useUserProfile } from "../../../utils/useUserProfile";



export default function AgreementInformation({
  // setSelect1,
  select1,
  select2,
  setSelect2,
  // user,
  agreementData,
  publicAccess = false,
  isDisabled = false,
  isSigning = false,
  isPublicAccess = false,
  handleBankSign,
  handleVerifyWithPhone,
  handleVerifyWithEmail,
  // Signature,
  Loader2,
  Shield,
  // approved = "pending",
}: {
  setSelect1: (value: string) => void;
  select1: string;
  select2: string;
  setSelect2: (value: string) => void;
  user: any;
  agreementData: {
    name: string;
    phone: string;
    socialSecurityNumber: string;
    email: string;
  };
  publicAccess?: any;
  isDisabled?: boolean;
  isSigning?: boolean;
  isPublicAccess?: boolean;
  handleBankSign: (useQrCode?: boolean) => void;
  handleVerifyWithPhone: () => void;
  handleVerifyWithEmail: () => void;
  Signature: React.ComponentType<{ strokeWidth?: string }>;
  Loader2: React.ComponentType<{ className?: string }>;
  Shield: React.ComponentType<{ className?: string }>;
  approved: "pending" | "approved" | "rejected" | undefined | any;
}) {
  const { user } = useUserProfile();

  console.log("user Data", user);

  return (
    <div className="w-full px-10 py-4 mb-20 flex gap-10">
      {/* Left Partner */}
      <div className="flex-1 space-y-6 p-5">
        <div className="flex justify-start items-center gap-2">
          <User />
          <h3 className="text-2xl font-bold text-[#333]">Bilhandlare</h3>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-1 w-full">
            <select
              id="signeringsmetod1"
              onChange={(e) => setSelect2(e.target.value)}
              className="py-1 px-2 mb-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            >
              <option value="Signeringsalternativ">Signeringsalternativ</option>
              {publicAccess ? (
                <>
                  <option value="denna-enhet">Sign via QR code</option>
                  <option value="e-postlänk">Sign on this device</option>
                  <option value="e-signatur">
                    Sign with electronic signature (e-sign)
                  </option>
                </>
              ) : (
                <>
                  <option value="denna-enhet">BankID via SMS-länk</option>
                  <option value="e-postlänk">BankID via email link</option>
                </>
              )}
            </select>
            <p>Name: {user?.first} {user?.last}</p>
            <p>SSN: {agreementData.socialSecurityNumber}</p>
            <p>E-post: {user?.email}</p>
            <p>Mobil: {user?.phone}</p>
            <StatusBadge title="Granskat" color="blue" />
            <button
              disabled={isDisabled || isSigning}
              className={`w-1/4 flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors cursor-pointer mt-5 ${isDisabled || isSigning
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              onClick={() => {
                if (isPublicAccess) {
                  handleBankSign(true);
                  return;
                }
                if (select1 === "denna-enhet" || select2 === "denna-enhet") {
                  handleVerifyWithPhone();
                } else if (select1 === "e-postlänk" || select2 === "e-postlänk") {
                  handleVerifyWithEmail();
                } else if (select1 === "qr-kod" || select2 === "qr-kod") {
                  handleBankSign(true);
                } else {
                  handleBankSign();
                }
              }}
            >
              {isSigning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Right Partner */}

      <div className="flex-1 space-y-6 p-5">
        <div className="flex justify-start items-center gap-2">
          <User />
          <h3 className="text-2xl font-bold text-[#333]">Kund</h3>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-1 w-full">
            <select
              id="signeringsmetod1"
              onChange={(e) => setSelect2(e.target.value)}
              className="py-1 px-2 mb-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            >
              <option value="Signeringsalternativ">Signeringsalternativ</option>
              {publicAccess ? (
                <>
                  <option value="denna-enhet">Sign via QR code</option>
                  <option value="e-postlänk">Sign on this device</option>
                  <option value="e-signatur">
                    Sign with electronic signature (e-sign)
                  </option>
                </>
              ) : (
                <>
                  <option value="denna-enhet">BankID via SMS-länk</option>
                  <option value="e-postlänk">BankID via email link</option>
                </>
              )}
            </select>
            <p>Name: {agreementData.name}</p>
            <p>SSN: {agreementData.socialSecurityNumber}</p>
            <p>E-post: {agreementData.email}</p>
            <p>Mobil: {agreementData.phone}</p>
            <StatusBadge title="Granskat" color="blue" />
            <button
              disabled={isDisabled || isSigning}
              className={`w-1/4 flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors cursor-pointer mt-5 ${isDisabled || isSigning
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              onClick={() => {
                if (isPublicAccess) {
                  handleBankSign(true);
                  return;
                }
                if (select1 === "denna-enhet" || select2 === "denna-enhet") {
                  handleVerifyWithPhone();
                } else if (select1 === "e-postlänk" || select2 === "e-postlänk") {
                  handleVerifyWithEmail();
                } else if (select1 === "qr-kod" || select2 === "qr-kod") {
                  handleBankSign(true);
                } else {
                  handleBankSign();
                }
              }}
            >
              {isSigning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              Send
            </button>
          </div>
        </div>
      </div>
    </div>



  );
}

function StatusBadge({ title, color }: { title?: string; color: string }) {
  return (
    <div
      className={`${color === "green"
        ? "bg-green-400/40"
        : color === "green"
          ? "bg-blue-400/40"
          : "bg-orange-400/40"
        }  rounded-full py-1 px-3 mt-2 -mx-1 w-fit`}
    >
      <div
        className={`${color === "green"
          ? "text-green-700"
          : color === "green"
            ? "text-blue-700"
            : "text-orange-700"
          } text-sm`}
      >
        {title}
      </div>
    </div>
  );
}
