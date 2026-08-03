import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PortfolioData } from "./types";
import { PROFILE } from "./profile";
import { formatPeriode } from "./format";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica" },
  header: { marginBottom: 16 },
  name: { fontSize: 20, fontWeight: 700 },
  title: { fontSize: 12, color: "#555", marginTop: 2 },
  contact: { fontSize: 9, color: "#555", marginTop: 6 },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 12, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", color: "#2563eb" },
  item: { marginBottom: 8 },
  itemTitle: { fontSize: 10, fontWeight: 700 },
  itemSubtitle: { fontSize: 9, color: "#555" },
  itemPeriod: { fontSize: 8, color: "#888" },
  itemDesc: { fontSize: 9, marginTop: 2, color: "#333" },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skill: { fontSize: 8, backgroundColor: "#eff6ff", color: "#2563eb", padding: "3 6", borderRadius: 4, marginRight: 4, marginBottom: 4 },
});

export function CvDocument({ data }: { data: PortfolioData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.title}>{PROFILE.title}</Text>
          <Text style={styles.contact}>
            {PROFILE.email} • {PROFILE.phone}
          </Text>
        </View>

        <Text style={{ fontSize: 9, color: "#333" }}>{PROFILE.bio}</Text>

        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expériences</Text>
            {data.experiences.map((e) => (
              <View key={e.id} style={styles.item}>
                <Text style={styles.itemTitle}>{e.poste} — {e.entreprise}</Text>
                <Text style={styles.itemPeriod}>{formatPeriode(e.date_debut, e.date_fin, e.en_cours)}</Text>
                <Text style={styles.itemDesc}>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.educations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formations</Text>
            {data.educations.map((e) => (
              <View key={e.id} style={styles.item}>
                <Text style={styles.itemTitle}>{e.diplome} — {e.etablissement}</Text>
                <Text style={styles.itemPeriod}>{formatPeriode(e.date_debut, e.date_fin, e.en_cours)}</Text>
              </View>
            ))}
          </View>
        )}

        {data.competences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.skillsRow}>
              {data.competences.map((c) => (
                <Text key={c.id} style={styles.skill}>{c.nom}</Text>
              ))}
            </View>
          </View>
        )}

        {data.projets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projets</Text>
            {data.projets.slice(0, 4).map((p) => (
              <View key={p.id} style={styles.item}>
                <Text style={styles.itemTitle}>{p.titre}</Text>
                <Text style={styles.itemSubtitle}>{p.technologies.join(", ")}</Text>
                <Text style={styles.itemDesc}>{p.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}