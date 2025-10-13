import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { pdfLogo } from "../../assets";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 9,
  },
  container: {
    maxWidth: 900,
    marginHorizontal: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10,
    marginBottom: 4,
    fontWeight: "semibold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 24,
  },
  tableCell: {
    borderWidth: 0.5,
    borderColor: "#d1d5db",
    padding: "1px 4px 2px 4px",
    fontSize: 8,
    flexGrow: 1,
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: "semibold",
  },
  grayRow: {
    backgroundColor: "#f9fafb",
  },
  signatureSection: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureLine: {
    width: "40%",
    borderTopWidth: 0.5,
    borderTopColor: "#d1d5db",
    paddingTop: 4,
  },
  signatureText: {
    fontSize: 8,
  },
  textRight: {
    textAlign: "right",
  },
  compactTable: {
    marginBottom: 4,
  },
});

interface AgreementPDFProps {
  agreementData: any;
  agreementID: string | number;
}

const AgreementPDF = ({ agreementData, agreementID }: AgreementPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container} wrap={false}>
          <View style={styles.header}>
            <View>
              <Image src={pdfLogo} style={{ width: 100 }} />{" "}
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10 }}>{agreementData.type}</Text>
              <Text style={{ fontSize: 8 }}>Kontrakts nr. {agreementID}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Köpare</Text>
            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Företagets namn</Text>
                  <Text>
                    {agreementData.customerType === "company"
                      ? agreementData.name || "N/A"
                      : "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Organisationsnummer
                  </Text>
                  <Text>
                    {agreementData.customerType === "company"
                      ? agreementData.organizationNumber || "N/A"
                      : "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Hemsida</Text>
                  <Text>N/A</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.grayRow]}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Adress</Text>
                  <Text>
                    {agreementData.address ? agreementData.address : "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Postnummer</Text>
                  <Text>N/A</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Stad</Text>
                  <Text>N/A</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Säljarens namn</Text>
                  <Text>{agreementData.name || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>E-postadress</Text>
                  <Text>{agreementData.email || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Telefonnummer</Text>
                  <Text>{agreementData.phone || "N/A"}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Säljare</Text>
            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Namn</Text>
                  <Text>
                    {agreementData.customerType === "private individual"
                      ? agreementData.name || "N/A"
                      : "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Konsument/Näringsidkare
                  </Text>
                  <Text>
                    {agreementData.customerType === "company"
                      ? "Company"
                      : "Private Individual"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>PEP</Text>
                  <Text>{agreementData.pep ? "Ja" : "Nej"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Person-/organisationsnummer
                  </Text>
                  <Text>
                    {agreementData.customerType === "company"
                      ? agreementData.organizationNumber || "N/A"
                      : agreementData.socialSecurityNumber || "N/A"}
                  </Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.grayRow]}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Adress</Text>
                  <Text>{agreementData.address || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Postnummer</Text>
                  <Text>
                    {agreementData.zipCode || agreementData.postalCode || "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Stad</Text>
                  <Text>{agreementData.city || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Personlig information verifierad
                  </Text>
                  <Text>{agreementData.verified ? "Ja" : "Nej"}</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Kontonr</Text>
                  <Text>
                    {agreementData.accountNumber ||
                      agreementData.bankAccount ||
                      "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>E-post</Text>
                  <Text>{agreementData.email || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Telefon</Text>
                  <Text>{agreementData.phone || "N/A"}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fordon</Text>

            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Märke/Modell</Text>
                  <Text>{agreementData.vehicleModel || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Registernummer</Text>
                  <Text>{agreementData.registrationNumber || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Chassisnummer</Text>
                  <Text>{agreementData.chassisNumber || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Inköpsdatum</Text>
                  <Text>{agreementData.purchaseDate || "N/A"}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Momsstatus</Text>
                  <Text>{agreementData.vatType || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Mätarställning</Text>
                  <Text>{agreementData.mileage || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Senast inspektions-datum
                  </Text>
                  <Text>
                    {agreementData.inspectionDateUpToAndIncluding ||
                      agreementData.latestService ||
                      "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Senast Service-datum
                  </Text>
                  <Text>
                    {agreementData.latestServiceDate ||
                      agreementData.latestService ||
                      "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Finansbolag /kreditgivare
                  </Text>
                  <Text>
                    {agreementData.financialCompany ||
                      agreementData.creditor ||
                      "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Importerad används</Text>
                  <Text>{agreementData.directimport ? "Ja" : "Nej"}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Däck</Text>
                  <Text>{agreementData.deck || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Årsmodell</Text>
                  <Text>{agreementData.vehicleYear || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Färg</Text>
                  <Text>{agreementData.color || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Nycklar</Text>
                  <Text>{agreementData.numberOfKeys || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Utsläppsklass</Text>
                  <Text>{agreementData.emissionClass || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Bränsletyp</Text>
                  <Text>{agreementData.fuelType || "N/A"}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Växellåda</Text>
                  <Text>{agreementData.gearbox || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Däcktyp</Text>
                  <Text>{agreementData.tires || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Försäkringstyp</Text>
                  <Text>{agreementData.insuranceType || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>PEP</Text>
                  <Text>{agreementData.pep ? "Ja" : "Nej"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Verifiering</Text>
                  <Text>{agreementData.verification || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Kreditsumma</Text>
                  <Text>{agreementData.creditAmountSales || "N/A"}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Leveransdatum</Text>
                  <Text>
                    {agreementData.deliveryDate ||
                      agreementData.salesDate ||
                      "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>kreditskuld SEK</Text>
                  <Text>{agreementData.creditAmount || "0.00"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>moms SEK</Text>
                  <Text>{agreementData.vatType || "N/A"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Pris inkl. moms SEK
                  </Text>
                  <Text>
                    {agreementData.salesPriceSEK ||
                      agreementData.purchasePrice ||
                      "0.00"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Utbetalningsbelopp SEK
                  </Text>
                  <Text>{agreementData.payoutAmount || "N/A"}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Tillägsinformation</Text>
                  <Text>{agreementData.notes || "N/A"}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leveransvilkor</Text>
            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Leveransdag</Text>
                  <Text>
                    {agreementData.deliveryDate ||
                      agreementData.salesDate ||
                      "N/A"}
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Leveransort</Text>
                  <Text>{agreementData.deliveryLocation || "Pickup"}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Leveransvilkor</Text>
                  <Text>{agreementData.deliveryTerms || "N/A"}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pris- och betalningsinformation
            </Text>
            <View style={[styles.table, styles.compactTable]}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>
                    Fordonets inköpspris
                  </Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={[styles.tableCellHeader, styles.textRight]}>
                    {agreementData.salesPriceSEK ||
                      agreementData.purchasePrice ||
                      "0.00"}{" "}
                    SEK
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Kreditskuld</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={[styles.tableCellHeader, styles.textRight]}>
                    {agreementData.creditAmount || "0.00"} SEK
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Moms</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={[styles.tableCellHeader, styles.textRight]}>
                    {agreementData.vatType || "N/A"}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.tableCellHeader}>Utbetalningsbelopp</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={[styles.tableCellHeader, styles.textRight]}>
                    {agreementData.payoutAmount ||
                      agreementData.salesPriceSEK ||
                      agreementData.purchasePrice ||
                      "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={{ fontSize: 10 }}>Underskrifter</Text>
            <Text style={{ fontSize: 8, marginBottom: 4 }}>Plats och tid</Text>
            <View style={styles.signatureSection}>
              <View style={styles.signatureLine}>
                <Text style={styles.signatureText}>
                  Säljarens signatur och namn
                </Text>
              </View>
              <View style={styles.signatureLine}>
                <Text style={styles.signatureText}>Köparens underskrift</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AgreementPDF;
