// InvoicePDFDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    title: { fontSize: 18, marginBottom: 10 },
    text: { fontSize: 12 },
});

const InvoicePDFDocument = ({ invoice }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Invoice</Text>
                <Text style={styles.text}>Customer: {invoice.customerdisplayname_id}</Text>
                <Text style={styles.text}>Email: {invoice.email}</Text>
                <Text style={styles.text}>Total: {invoice.total}</Text>
            </View>
            {/* Add other invoice fields similarly */}
        </Page>
    </Document>
);

export default InvoicePDFDocument;
