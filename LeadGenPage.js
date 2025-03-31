import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LeadGenPage() {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => setSubmitted(true))
      .catch(() => alert("Noe gikk galt. Prøv igjen senere."));
  };

  const forsikringer = [
    "Bilforsikring",
    "Husforsikring",
    "Innboforsikring",
    "Reiseforsikring",
    "Livsforsikring",
    "Barneforsikring",
    "Næringsforsikring",
    "Annet",
  ];

  const renderExtraFields = () => {
    switch (selected) {
      case "Bilforsikring":
        return (
          <>
            <Input name="biltype" placeholder="Biltype og modell" required />
            <Input name="regnr" placeholder="Registreringsnummer" required />
            <Input name="fodselsnummer" placeholder="Fødselsnummer (11 siffer)" required />
          </>
        );
      case "Husforsikring":
        return (
          <>
            <Input name="adresse" placeholder="Adresse" required />
            <Input name="byggar" placeholder="Byggeår" required />
            <Input name="areal" placeholder="Areal i kvm" required />
          </>
        );
      case "Innboforsikring":
        return (
          <>
            <Input name="adresse" placeholder="Adresse" required />
            <Input name="verdi" placeholder="Anslått verdi på innbo" required />
          </>
        );
      case "Reiseforsikring":
        return (
          <>
            <Input name="reisemønster" placeholder="Hyppighet og type reiser" required />
            <Input name="familiedekning" placeholder="Dekning for flere personer? (ja/nei)" required />
          </>
        );
      case "Livsforsikring":
        return (
          <>
            <Input name="fodselsnummer" placeholder="Fødselsnummer (11 siffer)" required />
            <Input name="forsikringsbelop" placeholder="Ønsket forsikringsbeløp" required />
          </>
        );
      case "Barneforsikring":
        return (
          <>
            <Input name="barnetsnavn" placeholder="Barnets navn" required />
            <Input name="barnetsfodselsdato" placeholder="Fødselsdato" required />
          </>
        );
      case "Næringsforsikring":
        return (
          <>
            <Input name="firmanavn" placeholder="Firmanavn" required />
            <Input name="organisasjonsnummer" placeholder="Org.nr" required />
            <Textarea name="forsikringsbehov" placeholder="Beskriv behov og eiendeler som skal forsikres" required />
          </>
        );
      case "Annet":
        return (
          <Textarea name="beskrivelse" placeholder="Beskriv hvilken type forsikring du ønsker" required />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">Få tilbud på forsikring</h1>
            <p className="text-sm text-center text-gray-500">
              Velg hvilken forsikring du ønsker tilbud på og fyll inn skjemaet.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {forsikringer.map((type) => (
                <Button
                  key={type}
                  variant={selected === type ? "default" : "outline"}
                  onClick={() => {
                    setSubmitted(false);
                    setSelected(type);
                  }}
                >
                  {type}
                </Button>
              ))}
            </div>

            {selected && !submitted && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <input type="hidden" name="forsikringstype" value={selected} />
                <Input name="navn" placeholder="Fullt navn" required />
                <Input name="telefon" placeholder="Telefonnummer" required />
                <Input name="epost" type="email" placeholder="E-postadresse" required />
                {renderExtraFields()}
                <Button type="submit" className="w-full">
                  Motta tilbud
                </Button>
              </form>
            )}

            {submitted && (
              <div className="text-green-600 text-center">
                Takk! Vi kontakter deg snarest angående {selected.toLowerCase()}.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
