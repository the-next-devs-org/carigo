import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { signatureLogo } from "../../assets";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  container: {
    maxWidth: 900,
    marginHorizontal: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 24,
  },
  tableCell: {
    borderWidth: 0.5,
    borderColor: "#d1d5db",
    padding: "6px 8px",
    fontSize: 9,
    flexGrow: 1,
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 2,
  },
  grayRow: {
    backgroundColor: "#f9fafb",
  },
  signatureSection: {
    marginTop: 40,
    marginBottom: 20,
  },
  signatureBox: {
    width: "100%",
    paddingTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signatureImage: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  signatureText: {
    fontSize: 9,
    marginTop: 4,
  },
  footer: {
    marginTop: 30,
    fontSize: 8,
    lineHeight: 1.4,
    textAlign: "center",
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: "#d1d5db",
    marginVertical: 20,
  },
  timestamp: {
    fontStyle: "italic",
    fontSize: 8,
    marginTop: 4,
  },
  verifikatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  transactionNumber: {
    fontSize: 10,
    marginBottom: 10,
  },
});

interface VerifikatPDFProps {
  transactionData: {
    transactionNumber: string;
    regNumber: string;
    contractType: string;
    createdTimestamp: string;
    dealerUsername: string;
    dealerEmail: string;
    dealerPhone: string;
    dealerName: string;
    dealerOrgNr: string;
    successTimestamp: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerPersonnr?: string;
  };
}

const VerifikatPDF = ({ transactionData }: VerifikatPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container} wrap={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.verifikatTitle}>Verifikat</Text>
            <Text style={styles.transactionNumber}>
              Transaktionsnummer: {transactionData.transactionNumber}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dokument</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>Registreringsnummer</Text>
                <Text>{transactionData.regNumber}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>Avtalstyp</Text>
                <Text>{transactionData.contractType}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={{ fontWeight: "bold" }}>Skapad</Text>
                <Text>{transactionData.createdTimestamp}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spännande parter - Försäljare</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.grayRow]}>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.tableCellHeader}>Företagsnamn</Text>
                <Text>{transactionData.dealerName}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.tableCellHeader}>Organisationsnummer</Text>
                <Text>{transactionData.dealerOrgNr}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.tableCellHeader}>Användarnamn</Text>
                <Text>{transactionData.dealerUsername}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.tableCellHeader}>E-post</Text>
                <Text>{transactionData.dealerEmail}</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.tableCellHeader}>Telefon</Text>
                <Text>{transactionData.dealerPhone}</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.grayRow]}>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.timestamp}>
                  Signeringstid: {transactionData.successTimestamp}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {transactionData.customerName && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kundinformation</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.grayRow]}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Namn</Text>
                  <Text>{transactionData.customerName}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Personnummer</Text>
                  <Text>{transactionData.customerPersonnr || "-"}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>E-post</Text>
                  <Text>{transactionData.customerEmail || "-"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Telefon</Text>
                  <Text>{transactionData.customerPhone || "-"}</Text>
                </View>
              </View>
              <View style={[styles.tableRow, styles.grayRow]}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.timestamp}>
                    Signeringstid: {transactionData.successTimestamp}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Image src={signatureLogo} style={styles.signatureImage} />
            <Text style={styles.signatureText}>
              Elektroniskt signerat med BankID
            </Text>
            <Text style={styles.timestamp}>
              Signeringstid: {transactionData.successTimestamp}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text>Detta dokument har signerats elektroniskt via Dealerpro.</Text>
          <Text>
            Signeringen har genomförts med BankID, vilket säkerställer en hög
            nivå av identitetskontroll och juridisk giltighet enligt svensk lag.
          </Text>
          <Text>
            Dealerpro möjliggör en trygg, spårbar och verifierad
            signeringsprocess mellan två parter. Ett unikt signeringsverifikat
            har genererats och kopplats till detta dokument. Verifikatet
            innehåller information om tidpunkt för signering, signerande part
            samt teknisk metadata, och har utfärdats av Dealerpro.
          </Text>
          <Text>
            Genom att använda Dealerpro garanteras att dokumentets innehåll är
            oförändrat efter signering och kan verifieras vid behov.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default VerifikatPDF;
