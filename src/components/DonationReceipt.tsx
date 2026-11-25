"use client";

import {
  Document as PDFDocument,
  Page as PDFPage,
  Text as PDFText,
  View as PDFView,
  StyleSheet,
} from "@react-pdf/renderer";

const Document = PDFDocument as unknown as React.FC<any>;
const Page = PDFPage as unknown as React.FC<any>;
const Text = PDFText as unknown as React.FC<any>;
const View = PDFView as unknown as React.FC<any>;

const RED = "#dc2626";
const DARK = "#111827";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const SOFT_BG = "#f9fafb";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: DARK,
  },

  // Top accent bar
  topBar: { height: 6, backgroundColor: RED },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 20,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  mark: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  markText: { color: "#ffffff", fontSize: 13, fontWeight: 700 },
  brand: { fontSize: 17, fontWeight: 700, color: DARK, marginLeft: 8 },
  brandSub: { fontSize: 8, color: MUTED, marginLeft: 8, marginTop: 1 },
  metaBlock: { alignItems: "flex-end" },
  metaTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: DARK,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metaLine: { fontSize: 8.5, color: MUTED, marginTop: 3 },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginHorizontal: 40,
  },

  // Status badge
  badgeRow: { paddingHorizontal: 40, marginTop: 20 },
  badgeSuccess: {
    alignSelf: "flex-start",
    backgroundColor: "#ecfdf5",
    borderWidth: 1,
    borderColor: "#a7f3d0",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeSuccessText: {
    color: "#047857",
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Info grid
  infoGrid: {
    flexDirection: "row",
    paddingHorizontal: 40,
    marginTop: 22,
    gap: 24,
  },
  infoCol: { flex: 1 },
  infoLabel: {
    fontSize: 8,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: { fontSize: 10.5, fontWeight: 700, color: DARK },

  // Line-item table
  table: { marginHorizontal: 40, marginTop: 26 },
  tableHeadRow: {
    flexDirection: "row",
    backgroundColor: SOFT_BG,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableHeadCellDesc: {
    flex: 3,
    fontSize: 8.5,
    fontWeight: 700,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableHeadCellAmt: {
    flex: 1,
    fontSize: 8.5,
    fontWeight: 700,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableCellDesc: { flex: 3 },
  tableCellDescTitle: { fontSize: 10.5, fontWeight: 700, color: DARK },
  tableCellDescSub: { fontSize: 8.5, color: MUTED, marginTop: 2 },
  tableCellAmt: {
    flex: 1,
    fontSize: 10.5,
    fontWeight: 700,
    color: DARK,
    textAlign: "right",
  },

  // Total
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 14,
  },
  totalLabel: {
    fontSize: 10,
    color: MUTED,
    marginRight: 14,
    paddingTop: 4,
  },
  totalValueBox: { alignItems: "flex-end" },
  totalValue: { fontSize: 20, fontWeight: 700, color: RED },
  totalCurrency: { fontSize: 9, color: MUTED, marginTop: 2 },

  // Footer
  footerWrap: {
    position: "absolute",
    bottom: 34,
    left: 40,
    right: 40,
  },
  footerDivider: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    marginBottom: 12,
  },
  footerNote: {
    fontSize: 8,
    color: MUTED,
    textAlign: "center",
    lineHeight: 1.5,
  },
  footerBrand: {
    fontSize: 8,
    color: DARK,
    fontWeight: 700,
    textAlign: "center",
    marginTop: 4,
  },
});

export interface ReceiptData {
  donorName?: string;
  donorEmail: string;
  amount: number;
  currency: string;
  tranId: string;
  status: string;
  createdAt: string;
}

export default function DonationReceipt({ data }: { data: ReceiptData }) {
  const date = new Date(data.createdAt);
  const isPaid = data.status === "PAID";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.mark}>
              <Text style={styles.markText}>B</Text>
            </View>
            <View>
              <Text style={styles.brand}>BloodFlow</Text>
              <Text style={styles.brandSub}>Blood Donation Platform</Text>
            </View>
          </View>

          <View style={styles.metaBlock}>
            <Text style={styles.metaTitle}>Receipt</Text>
            <Text style={styles.metaLine}>No. {data.tranId}</Text>
            <Text style={styles.metaLine}>
              {date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Status badge */}
        <View style={styles.badgeRow}>
          <View style={isPaid ? styles.badgeSuccess : styles.badgeSuccess}>
            <Text style={styles.badgeSuccessText}>
              {isPaid ? "Payment Confirmed" : data.status}
            </Text>
          </View>
        </View>

        {/* Donor / transaction info */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Received From</Text>
            <Text style={styles.infoValue}>
              {data.donorName || data.donorEmail}
            </Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{data.donorEmail}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Payment Time</Text>
            <Text style={styles.infoValue}>
              {date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>

        {/* Line item table */}
        <View style={styles.table}>
          <View style={styles.tableHeadRow}>
            <Text style={styles.tableHeadCellDesc}>Description</Text>
            <Text style={styles.tableHeadCellAmt}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellDesc}>
              <Text style={styles.tableCellDescTitle}>
                Monetary Contribution
              </Text>
              <Text style={styles.tableCellDescSub}>
                One-time donation to support BloodFlow's operations
              </Text>
            </View>
            <Text style={styles.tableCellAmt}>
              {data.amount.toLocaleString()} {data.currency}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <View style={styles.totalValueBox}>
              <Text style={styles.totalValue}>
                {data.amount.toLocaleString()}
              </Text>
              <Text style={styles.totalCurrency}>{data.currency}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerWrap}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerNote}>
            This is a computer-generated receipt and does not require a
            signature. Keep this for your records.
          </Text>
          <Text style={styles.footerBrand}>
            BloodFlow · bloodflow.sayemtech.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}
