import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import {
  Download,
  Shield,
  CheckCircle,
  Loader2,
  Signature,
  Link,
  // Copy,
} from "lucide-react";
import toast from "react-hot-toast";
import { makeGetRequest, makePostRequest } from "../../api/Api";
import {
  BACKEND_API_ENDPOINT,
  xApiKey,
} from "../../api/config";
import AgreementPDF from "../../components/SignAgreement/AgreementPDF";
import VerifikatPDF from "../../components/SignAgreement/VerifatPDF";
import { useUserProfile } from "../../utils/useUserProfile";
import { pdfLogo } from "../../assets";
import { formatRemainingTime } from "../../utils/publicSigningUtils";
import AgreementInformation from "../../components/Agreements/addNewAgreement/AgreementInformation";

import Fordon from "../../components/Agreements/agreementInfo/Fordon";
import Leveransvilkor from "../../components/Agreements/agreementInfo/Leveransvilkor";
import Pris from "../../components/Agreements/agreementInfo/Pris";
import AuthUserInfo from "../../components/Agreements/agreementInfo/AuthUserInfo";
import CustomerInfo from "../../components/Agreements/agreementInfo/CustomerInfo";
import axios from "axios";

const AgreementSign = () => {
  const { agreementID } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef<HTMLDivElement>(null);

  // Get URL parameters for public access
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("token");
  const expiryTime = urlParams.get("expires");
  const isPublicAccess = accessToken && expiryTime;

  const [agreementData, setAgreementData] = useState<any>(null);
  const [termsChecked, setTermsChecked] = useState(true);
  const [gdprChecked, setGdprChecked] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [showQR, setShowQR] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [signingStatus, setSigningStatus] = useState<
    "pending" | "approved" | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVerificationOptions, setShowVerificationOptions] = useState(false);
  const [bankIdUrl, setBankIdUrl] = useState("");
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [remainingTimeText, setRemainingTimeText] = useState("");
  const [isGeneratingPublicLink, setIsGeneratingPublicLink] = useState(false);
  // const [publicAccessLink, setPublicAccessLink] = useState("");

  // Ref to store polling interval ID for cleanup
  const pollingIntervalRef = useRef<number | null>(null);
  const pollingTimeoutRef = useRef<number | null>(null);

  console.log(showVerificationOptions);

  console.log("agreementData", agreementData);

  const { user } = useUserProfile();

  // Check if public access link is expired
  const checkLinkExpiry = useCallback(() => {
    if (isPublicAccess && expiryTime) {
      const expiryTimestamp = parseInt(expiryTime);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp > expiryTimestamp) {
        setIsLinkExpired(true);
        setError("This signing link has expired. Please request a new one.");
        return true;
      }
    }
    return false;
  }, [isPublicAccess, expiryTime]);

  const [select1, setSelect1] = useState("Signeringsalternativ");
  const [select2, setSelect2] = useState("Signeringsalternativ");

  // Cleanup function for polling
  const clearPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  };

  console.log("userInfo", user);

  // Cancel signing function
  const cancelSigning = () => {
    clearPolling();
    setSigningStatus(null);
    setIsSigning(false);
    toast("Signing process cancelled");
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      clearPolling();
    };
  }, []);

  // Check link expiry periodically for public access
  useEffect(() => {
    if (isPublicAccess && expiryTime) {
      const updateRemainingTime = () => {
        const timeText = formatRemainingTime(expiryTime);
        setRemainingTimeText(timeText);

        if (checkLinkExpiry()) {
          return; // Stop if expired
        }
      };

      // Update immediately
      updateRemainingTime();

      // Update every second for live countdown
      const interval = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(interval);
    }
  }, [isPublicAccess, expiryTime, checkLinkExpiry]);

  // console.log("orderRef", orderRef);

  const transactionData = {
    transactionNumber: "12345",
    regNumber: "ABC123",
    contractType: "Köpeavtal",
    createdTimestamp: "2025-07-06 14:30",
    dealerUsername: "dealername",
    dealerEmail: "dealer@example.com",
    dealerPhone: "+46 123 456 789",
    dealerName: "Dealer AB",
    dealerOrgNr: "556677-8899",
    successTimestamp: "2025-07-06 14:35",
    customerName: "Kund Namn",
    customerEmail: "kund@example.com",
    customerPhone: "+46 987 654 321",
    customerPersonnr: "19800101-1234",
  };

  const storedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");

    console.log("Stored Token:", storedToken);
  // const tokenToSend = publicAccessLink ? accessToken : storedToken;

  // console.log("tokenToSend", tokenToSend);

  useEffect(() => {
    const fetchAgreementData = async () => {
      if (!agreementID) {
        setError("No agreement ID provided");
        setIsLoading(false);
        return;
      }

      // Check link expiry first for public access
      if (isPublicAccess && checkLinkExpiry()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log("=== DEBUG TOKEN USAGE ===");
        console.log("isPublicAccess:", isPublicAccess);
        console.log("accessToken from URL:", accessToken);
        console.log("agreementID:", agreementID);

        // Determine the endpoint based on access type
        const endpoint = isPublicAccess
          ? `publicsigning/getAgreement/${agreementID}?token=${accessToken}`
          : `agreements/getAgreementById/${agreementID}`;

        console.log("Using endpoint:", endpoint);

        let response;

        if (isPublicAccess) {
          // For public access, make a direct fetch call without authentication headers
          const fullUrl = `${BACKEND_API_ENDPOINT}${endpoint}`;
          console.log("Making fetch request to:", fullUrl);
          console.log("Headers being sent:", {
            "Content-Type": "application/json",
            "x-api-key": xApiKey,
          });

          const fetchResponse = await fetch(fullUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": xApiKey,
            },
          });
          const data = await fetchResponse.json();
          console.log("API Response:", data);
          response = { data };
        } else {
          // For authenticated access, use the normal makeGetRequest
          response = await makeGetRequest(endpoint);
        }

        if (response.data.success) {
          setAgreementData(response.data.data);
        } else {
          setError(
            isPublicAccess
              ? "Invalid or expired signing link"
              : "Failed to fetch agreement data"
          );
        }
      } catch (err) {
        console.error("Error fetching agreement:", err);
        setError(
          isPublicAccess
            ? "Invalid or expired signing link"
            : "Error fetching agreement data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgreementData();
  }, [agreementID, isPublicAccess, accessToken, checkLinkExpiry]);

  const handleDownload = async () => {
    if (!agreementData) {
      toast.error("Agreement data not available");
      return;
    }

    try {
      toast.loading("Generating PDF...", { id: "pdf-generation" });

      const blob = await pdf(
        <AgreementPDF
          agreementData={agreementData}
          agreementID={agreementID || "N/A"}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      link.download = `Agreement-${agreementID}-${timestamp}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("PDF downloaded successfully!", { id: "pdf-generation" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.", {
        id: "pdf-generation",
      });
    }
  };

  const handleGeneratePublicLink = async () => {
    if (!agreementID) {
      toast.error("Agreement ID not available");
      return;
    }

    setIsGeneratingPublicLink(true);
    try {
      // Get the token from localStorage or sessionStorage like your other API calls
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required. Please log in.");
        return;
      }

      // Use the correct endpoint with proper authentication headers
      const response = await fetch(
        `${BACKEND_API_ENDPOINT}publicsigning/generate-token/${agreementID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xApiKey,
            token: `${token}`,
          },
          body: JSON.stringify({
            expiryHours: 1,
            emailSent: null,
            smsSent: null,
          }), // Default 1 hour expiry with email/SMS tracking
        }
      );

      const data = await response.json();

      if (data.success) {
        const publicUrl = data.data.publicLink;

        // Copy to clipboard
        await navigator.clipboard.writeText(publicUrl);
        // setPublicAccessLink(publicUrl);

        toast.success("Public signing link copied to clipboard!");
        console.log("Generated public URL:", publicUrl);
        return publicUrl;
      } else {
        throw new Error(data.message || "Failed to generate public link");
      }
    } catch (error) {
      console.error("Error generating public link:", error);
      toast.error("Failed to generate public link. Please try again.");
    } finally {
      setIsGeneratingPublicLink(false);
    }
  };

  const handleDownloadVerifikat = async () => {
    if (!transactionData) {
      toast.error("Transaction data not available");
      return;
    }

    try {
      toast.loading("Generating Verifikat PDF...", {
        id: "verifikat-generation",
      });

      const blob = await pdf(
        <VerifikatPDF transactionData={transactionData} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `verifikat-${transactionData.transactionNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Verifikat downloaded successfully!", {
        id: "verifikat-generation",
      });
    } catch (error) {
      console.error("Error generating Verifikat PDF:", error);
      toast.error("Failed to generate Verifikat. Please try again.", {
        id: "verifikat-generation",
      });
    }
  };

  const handleBankHelper = async (
    agreementID: string | undefined,
    showQr: boolean = false
  ) => {

    const payload = {
      agreementID: parseInt(agreementID ?? ""),
      endUserIp: "13.60.79.146",
      userVisibleData: "Signing agreement for BankID",
      userNonVisibleData: "Agreement signing",
      getQr: true,
    };

    console.log("=== BANK HELPER DEBUG ===");
    console.log("isPublicAccess:", isPublicAccess);
    console.log("showQr:", showQr);
    console.log("Payload:", payload);

    let response;

    if (isPublicAccess) {
      // For public access, use direct fetch without localStorage token
      const fetchResponse = await fetch(
        `${BACKEND_API_ENDPOINT}banksign/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "x-api-key": xApiKey,
            token: `${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await fetchResponse.json();
      response = { data };
    } else {
      // For authenticated access, use makePostRequest
      response = await makePostRequest("banksign/start", payload);
    }

    console.log("BankSign start response:", response.data);

    if (response.data.success) {
      if (response.data.bankIdResponse?.qrImage && showQr) {
        console.log("Setting QR code:", response.data.bankIdResponse.qrImage);
        setShowQR(response.data.bankIdResponse.qrImage);
      }
      if (response.data.bankIdResponse?.bankidUrl) {
        setBankIdUrl(response.data.bankIdResponse.bankidUrl);
        setShowVerificationOptions(true);
      }
      if (response.data.bankIdResponse?.orderRef) {
        setOrderRef(response.data.bankIdResponse.orderRef);

        // Start polling for status
        const pollStatus = async () => {
          try {
            const statusResponse = await makePostRequest("banksign/status", {
              orderRef: response.data.bankIdResponse.orderRef,
            });

            console.log("BankID Status Response:", statusResponse.data);

            // Check for completion status more carefully
            if (
              statusResponse.data.success &&
              statusResponse.data.bankIdStatus?.Response?.Status === "complete"
            ) {
              setSigningStatus("approved");
              toast.success("Signing approved successfully!");
              clearPolling();
              handleDownloadVerifikat();
            } else if (
              statusResponse.data.bankIdStatus?.Response?.Status === "failed" ||
              statusResponse.data.bankIdStatus?.Response?.Status === "cancelled"
            ) {
              setSigningStatus(null);
              toast.error("Signing failed or was cancelled. Please try again.");
              clearPolling();
            } else {
              // Keep status as pending for other states like "outstanding", "started", "pending", etc.
              setSigningStatus("pending");
            }
          } catch (statusError) {
            console.error("Error checking signing status:", statusError);
            setSigningStatus("pending");
          }
        };

        // Set signing status to pending immediately
        setSigningStatus("pending");

        // Clear any existing polling interval
        clearPolling();

        // Start polling after a delay to give the service time to process
        pollingIntervalRef.current = setInterval(
          pollStatus,
          3000
        ) as unknown as number;

        // Set a timeout to stop polling after 5 minutes (300 seconds)
        pollingTimeoutRef.current = setTimeout(() => {
          clearPolling();
          setSigningStatus(null);
          toast.error("Signing timeout. Please try again.");
        }, 300000) as unknown as number;

        // Return cleanup function
        return clearPolling;
      }
    } else {
      toast.error("Failed to initiate BankID signing");
      return;
    }
  };

  const handleBankSign = async (showQr: boolean = false) => {
    if (!termsChecked || !gdprChecked) {
      toast.error("Please accept all terms and conditions");
      return;
    }

    if (!agreementID) {
      toast.error("No agreement ID found");
      return;
    }

    setIsSigning(true);
    setSigningStatus(null);

    try {
      await handleBankHelper(agreementID, showQr);
    } catch (error: any) {
      console.error("Error initiating BankID signing:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during signing"
      );
    } finally {
      setIsSigning(false);
    }
  };

  const handleVerifyWithPhone = async () => {
    const publicLink = await handleGeneratePublicLink();

    const phoneNumber =
      select1 === "denna-enhet"
        ? user?.phone
        : select2 === "denna-enhet"
        ? agreementData?.phone
        : null;

    // For public access, use customer phone from agreement data
    const targetPhone = isPublicAccess ? agreementData?.phone : phoneNumber;

    if (!targetPhone) {
      toast.error("No phone number found");
      return;
    }
    try {
      setIsSigning(true);
      await handleBankHelper(agreementID);

      if (storedToken !== null) {
        const response = await axios.post(
          `${BACKEND_API_ENDPOINT}banksign/sendBankIdLinkSMS`,
          {
            phone: targetPhone,
            link: publicLink,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: storedToken,
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("BankID link sent to your phone!");
          setShowVerificationOptions(false);

          // Start polling for status
          if (orderRef) {
            const pollStatus = async () => {
              try {
                const statusResponse = await makePostRequest(
                  "banksign/status",
                  {
                    orderRef: orderRef,
                  }
                );

                console.log("Phone verification status:", statusResponse.data);

                if (
                  statusResponse.data.success &&
                  statusResponse.data.bankIdStatus?.Response?.Status ===
                    "complete"
                ) {
                  setSigningStatus("approved");
                  toast.success("Signing approved successfully!");
                  clearPolling();
                  handleDownloadVerifikat();
                } else if (
                  statusResponse.data.bankIdStatus?.Response?.Status ===
                    "failed" ||
                  statusResponse.data.bankIdStatus?.Response?.Status ===
                    "cancelled"
                ) {
                  setSigningStatus(null);
                  toast.error(
                    "Signing failed or was cancelled. Please try again."
                  );
                  clearPolling();
                } else {
                  setSigningStatus("pending");
                }
              } catch (statusError) {
                console.error("Error checking signing status:", statusError);
                setSigningStatus("pending");
              }
            };

            // Set status to pending first
            setSigningStatus("pending");

            // Clear any existing polling
            clearPolling();

            // Start polling without initial immediate call
            pollingIntervalRef.current = setInterval(
              pollStatus,
              3000
            ) as unknown as number;
          }
        } else {
          toast.error(response.data.message || "Failed to send SMS");
        }
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send SMS. Please try again.");
    } finally {
      setIsSigning(false);
    }
  };

  const handleVerifyWithEmail = async () => {
    // For public access, use customer email from agreement data
    const targetEmail = isPublicAccess ? agreementData?.email : user?.email;
    const targetEmail2 = isPublicAccess ? agreementData?.email : agreementData?.email;

   
    if (!targetEmail) {
      toast.error("No email found");
      return;
    }

    try {
      setIsSigning(true);
      const response = await makePostRequest("email/send-bankid-link", {
        email: targetEmail2,
        link: bankIdUrl,
        ...(isPublicAccess && { accessToken, publicAccess: true }),
      });

      if (response.data.success) {
        toast.success("BankID link sent to your email!");
        setShowVerificationOptions(false);

        if (orderRef) {
          const pollStatus = async () => {
            try {
              const statusResponse = await makePostRequest("banksign/status", {
                orderRef: orderRef,
              });

              console.log("Email verification status:", statusResponse.data);

              if (
                statusResponse.data.success &&
                statusResponse.data.bankIdStatus?.Response?.Status ===
                  "complete"
              ) {
                setSigningStatus("approved");
                toast.success("Signing approved successfully!");
                clearPolling();
                handleDownloadVerifikat();
              } else if (
                statusResponse.data.bankIdStatus?.Response?.Status ===
                  "failed" ||
                statusResponse.data.bankIdStatus?.Response?.Status ===
                  "cancelled"
              ) {
                setSigningStatus(null);
                toast.error(
                  "Signing failed or was cancelled. Please try again."
                );
                clearPolling();
              } else {
                setSigningStatus("pending");
              }
            } catch (statusError) {
              console.error("Error checking signing status:", statusError);
              setSigningStatus("pending");
            }
          };

          // Set status to pending first
          setSigningStatus("pending");

          // Clear any existing polling
          clearPolling();

          // Start polling without initial immediate call
          pollingIntervalRef.current = setInterval(
            pollStatus,
            3000
          ) as unknown as number;
        }
      } else {
        toast.error(response.data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSigning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 font-plus-jakarta flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-700">Loading agreement data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 font-plus-jakarta flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!agreementData) {
    return (
      <div className="min-h-screen bg-gray-100 font-plus-jakarta flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            No Agreement Found
          </h2>
          <p className="text-gray-700 mb-6">
            The requested agreement could not be loaded.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isDisabled = !(termsChecked && gdprChecked);

  return (
    <div className="min-h-screen bg-gray-100 font-plus-jakarta">
      <div className="bg-white border-b border-gray-200 lg:p-6 p-4">
        <div className="flex items-center justify-between max-w-full">
          {/* <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">
              DealerPro
            </span>
          </div> */}
          <div className="md:flex hidden gap-3 justify-center">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            {!isPublicAccess && (
              <button
                className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGeneratePublicLink}
                disabled={isGeneratingPublicLink}
              >
                {isGeneratingPublicLink ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Link className="w-4 h-4" />
                )}
                {isGeneratingPublicLink ? "Generating..." : "Copy Public Link"}
              </button>
            )}
          </div>
          <div className="flex items-center gap-5">
            <p className="text-gray-800 text-lg text-center">
              Vehicle: {agreementData.registrationNumber || "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Secure Environment
          </div>
        </div>
      </div>

      <div className="max-w-full lg:p-6 p-4">
        {/* Show link expiry warning for public access */}
        {isPublicAccess && expiryTime && !isLinkExpired && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-800">
                  Temporary Signing Link
                </h4>
                <div className="text-yellow-700 text-sm mt-1">
                  <p className="mb-1">
                    This link will expire on{" "}
                    {new Date(parseInt(expiryTime) * 1000).toLocaleString()}.
                  </p>
                  <p className="font-semibold">
                    {remainingTimeText || formatRemainingTime(expiryTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="lg:p-6 p-3 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Agreement Preview
            </h2>
          </div>

          <div className="flex md:hidden gap-3 justify-center mt-3">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          <div className="lg:p-6 px-3">
            <div
              ref={pdfRef}
              className="bg-white p-4 sm:p-6 md:p-8 font-plus-jakarta"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <img src={pdfLogo} alt="" />
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <p>{agreementData.type || "N/A"}</p>
                  <p className="text-xs">Kontrakts nr. {agreementData.id}</p>
                </div>
              </div>

              {agreementData.type === "Sales Agreement" ? (
                <>
                  <div className="mt-3 overflow-x-auto">
                    <p>Säljare</p>
                    <AuthUserInfo agreementData={agreementData} user={user} />
                  </div>
                  <div className="mt-3 overflow-x-auto">
                    <p>Köpare</p>
                    <CustomerInfo agreementData={agreementData} />
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-3 overflow-x-auto">
                    <p>Köpare</p>
                    <AuthUserInfo agreementData={agreementData} user={user} />
                  </div>
                  <div className="mt-3 overflow-x-auto">
                    <p>Säljare</p>
                    <CustomerInfo agreementData={agreementData} />
                  </div>
                </>
              )}

              <Fordon agreementData={agreementData} />
              {agreementData.type === "Sales Agreement" && (
                <Leveransvilkor agreementData={agreementData} />
              )}
              <Pris agreementData={agreementData} />

              <div className="mt-5 flex flex-col gap-1">
                <p>Underskrifter</p>
                <p className="text-xs">Plats och tid </p>
              </div>

              <div className="grid grid-cols-2 gap-16 mt-16">
                <div className="border-t border-gray-300 pt-2">
                  <p className="text-xs">Säljarens signatur och namn </p>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <p className="text-xs">Köparens underskrift</p>
                </div>
              </div>
            </div>
          </div>
          {showQR && (
            <div className="flex justify-center">
              <img src={showQR} alt="BankID QR Code" />
            </div>
          )}

          <div className="lg:p-6 p-4 border-t border-gray-100">
            {/* Only show signing options for logged-in users */}

            <AgreementInformation
              setSelect1={setSelect1}
              setSelect2={setSelect2}
              agreementData={agreementData}
              user={user}
              publicAccess={isPublicAccess}
              Loader2={Loader2}
              Shield={Shield}
              Signature={Signature}
              approved={signingStatus}
              handleBankSign={handleBankSign}
              handleVerifyWithEmail={handleVerifyWithEmail}
              handleVerifyWithPhone={handleVerifyWithPhone}
              select1={select1}
              select2={select2}
              isSigning={isSigning}
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Terms and Conditions
            </h3>
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  I have read and accept the{" "}
                  <a
                    href="#"
                    className="text-blue-600 underline hover:text-blue-700"
                  >
                    general terms and conditions
                  </a>{" "}
                  for digital signing
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gdprChecked}
                  onChange={(e) => setGdprChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  I consent to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 underline hover:text-blue-700"
                  >
                    processing of personal data
                  </a>{" "}
                  according to GDPR
                </span>
              </label>
            </div>

            {signingStatus && (
              <div
                className={`my-4 p-3 rounded-lg text-center ${
                  signingStatus === "approved"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {signingStatus === "approved" ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Approved</span>
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-medium">
                        Waiting for signature...
                      </span>
                    </>
                  )}
                </div>
                {signingStatus === "pending" && (
                  <div className="mt-2 text-sm">
                    <p>
                      Please complete the signing process in your BankID app.
                    </p>
                    <p className="text-xs mt-1 text-yellow-600">
                      Automatically checking status every 3 seconds...
                    </p>
                    <button
                      onClick={cancelSigning}
                      className="mt-3 px-4 py-2 text-sm bg-red-100 text-red-700 border border-red-200 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Cancel Signing
                    </button>
                  </div>
                )}
                {signingStatus === "approved" && (
                  <div className="mt-2">
                    <button
                      onClick={() => navigate("/agreements")}
                      className="text-sm text-green-700 underline hover:text-green-800"
                    >
                      View signed agreement
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                disabled={isDisabled || isSigning}
                className={`px-6 py-3 rounded-md font-medium border transition-colors cursor-pointer ${
                  isDisabled || isSigning
                    ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => navigate(-1)}
              >
                Close
              </button>
              {/* <button
                disabled={isDisabled || isSigning}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors cursor-pointer ${
                  isDisabled || isSigning
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => handleBankSign()}
              >
                {isSigning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                Sign with BankID
              </button> */}

              {/* <button
                disabled={isDisabled || isSigning}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors cursor-pointer ${
                  isDisabled || isSigning
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => {
                  // For public access, use QR code by default for better UX
                  if (isPublicAccess) {
                    handleBankSign(true);
                    return;
                  }

                  // For logged-in users, use selected method
                  if (select1 === "denna-enhet" || select2 === "denna-enhet") {
                    handleVerifyWithPhone();
                  } else if (
                    select1 === "e-postlänk" ||
                    select2 === "e-postlänk"
                  ) {
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
                <Signature strokeWidth="1.5" />
                Signera
              </button> */}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">
                    {isPublicAccess
                      ? "Secure Public Signing"
                      : "Secure Signing with BankID and E-signature"}
                  </h4>
                  <p className="text-blue-700 text-sm mt-1">
                    {isPublicAccess
                      ? "Your signature is handled securely. After signing, you'll receive a verification certificate that can be downloaded."
                      : "Your signature is handled securely and complies with Swedish legal standards."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementSign;
