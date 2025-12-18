import { useState, FormEvent, ChangeEvent } from 'react';

// Configuration Supabase
const SUPABASE_URL = 'https://hnwipygwutmgbkpbxnqg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhud2lweWd3dXRtZ2JrcGJ4bnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMzAxOTgsImV4cCI6MjA4MTYwNjE5OH0.VEGATGmJ0fLPCJZBh6mGOaSUpR9MM1odIQpUQjMiBiI';
const TABLE_NAME = 'reponses_formulaire';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}`;

interface FormData {
  nom_prenom: string;
  entreprise: string;
  role: string;
  ca_annuel: string;
  formats: string[];
  formats_autre: string;
  format_performant: string;
  repartition: string;
  canaux: string[];
  canaux_autre: string;
  motion_3d: string;
  obstacles: string[];
  obstacles_autre: string;
  insight_libre: string;
}

const EcomForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nom_prenom: '',
    entreprise: '',
    role: '',
    ca_annuel: '',
    formats: [],
    formats_autre: '',
    format_performant: '',
    repartition: '',
    canaux: [],
    canaux_autre: '',
    motion_3d: '',
    obstacles: [],
    obstacles_autre: '',
    insight_libre: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showFormatsAutre, setShowFormatsAutre] = useState(false);
  const [showCanauxAutre, setShowCanauxAutre] = useState(false);
  const [showObstaclesAutre, setShowObstaclesAutre] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, isAutre = false) => {
    if (isAutre) {
      if (name === 'formats') setShowFormatsAutre(!showFormatsAutre);
      if (name === 'canaux') setShowCanauxAutre(!showCanauxAutre);
      if (name === 'obstacles') setShowObstaclesAutre(!showObstaclesAutre);
    }

    setFormData(prev => {
      const currentArray = prev[name as keyof FormData] as string[];
      if (currentArray.includes(value)) {
        return { ...prev, [name]: currentArray.filter(v => v !== value) };
      } else {
        return { ...prev, [name]: [...currentArray, value] };
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const supabaseData = {
        nom_prenom: formData.nom_prenom || null,
        entreprise: formData.entreprise || null,
        role: formData.role || null,
        ca_annuel: formData.ca_annuel || null,
        formats: formData.formats.length > 0 ? formData.formats : null,
        formats_autre: formData.formats_autre || null,
        format_performant: formData.format_performant || null,
        repartition: formData.repartition || null,
        canaux: formData.canaux.length > 0 ? formData.canaux : null,
        canaux_autre: formData.canaux_autre || null,
        motion_3d: formData.motion_3d || null,
        obstacles: formData.obstacles.length > 0 ? formData.obstacles : null,
        obstacles_autre: formData.obstacles_autre || null,
        insight_libre: formData.insight_libre || null,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(supabaseData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        nom_prenom: '',
        entreprise: '',
        role: '',
        ca_annuel: '',
        formats: [],
        formats_autre: '',
        format_performant: '',
        repartition: '',
        canaux: [],
        canaux_autre: '',
        motion_3d: '',
        obstacles: [],
        obstacles_autre: '',
        insight_libre: '',
      });
      setShowFormatsAutre(false);
      setShowCanauxAutre(false);
      setShowObstaclesAutre(false);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Enquête - Contenus E-commerce</h1>
            <p className="text-indigo-100 mt-2">Merci de prendre quelques minutes pour répondre à ce questionnaire.</p>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✅ Formulaire soumis avec succès ! Merci pour votre participation.</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">❌ Erreur lors de l'envoi. Veuillez réessayer.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* SECTION 1 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b-2 border-indigo-100 mb-6">
                SECTION 1 – Profil (rapide)
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    <span className="text-gray-400 mr-2">1.</span>
                    Nom et prénom <span className="text-gray-400 text-sm">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    name="nom_prenom"
                    value={formData.nom_prenom}
                    onChange={handleTextChange}
                    placeholder="Votre nom et prénom"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    <span className="text-gray-400 mr-2">2.</span>
                    Entreprise / marque <span className="text-gray-400 text-sm">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleTextChange}
                    placeholder="Nom de votre entreprise ou marque"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    <span className="text-gray-400 mr-2">3.</span>
                    Quel est votre rôle ?
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleTextChange}
                    placeholder="Ex : Social media, e-commerce, CRM, marketing, direction artistique, etc."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-3">
                    <span className="text-gray-400 mr-2">4.</span>
                    Ordre de grandeur du chiffre d'affaires e-commerce annuel
                  </label>
                  <div className="space-y-2">
                    {['< 200 k€', '200 k€ – 1 M€', '1 – 10 M€', '> 10 M€', 'Je ne sais pas'].map((option) => (
                      <label key={option} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="radio"
                          name="ca_annuel"
                          checked={formData.ca_annuel === option}
                          onChange={() => handleRadioChange('ca_annuel', option)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b-2 border-indigo-100 mb-6">
                SECTION 2 – Formats de contenus utilisés
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-3">
                    <span className="text-gray-400 mr-2">5.</span>
                    Quels formats utilisez-vous aujourd'hui ?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'Visuels statiques', label: 'Visuels statiques (packshots, bannières, photos produit)' },
                      { value: 'Vidéos studio', label: 'Vidéos studio (prise de vue réelle, démonstrations produit)' },
                      { value: 'Vidéos motion', label: 'Vidéos motion (texte animé, effets graphiques, transitions dynamiques)' },
                      { value: 'Rendus 3D', label: 'Rendus 3D / modèles produit (animations ou visuels générés en 3D)' },
                      { value: 'UGC', label: 'UGC / contenus créateurs (clients, influenceurs, vidéos authentiques)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={formData.formats.includes(option.value)}
                          onChange={() => handleCheckboxChange('formats', option.value)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700">{option.label}</span>
                      </label>
                    ))}
                    <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData.formats.includes('Autre')}
                        onChange={() => handleCheckboxChange('formats', 'Autre', true)}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-gray-700">Autre :</span>
                    </label>
                    {showFormatsAutre && (
                      <input
                        type="text"
                        name="formats_autre"
                        value={formData.formats_autre}
                        onChange={handleTextChange}
                        placeholder="Précisez"
                        className="ml-7 w-[calc(100%-1.75rem)] px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    <span className="text-gray-400 mr-2">6.</span>
                    Quel format vous semble le plus performant aujourd'hui ? Pourquoi ?
                  </label>
                  <textarea
                    name="format_performant"
                    value={formData.format_performant}
                    onChange={handleTextChange}
                    placeholder="Votre réponse..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b-2 border-indigo-100 mb-6">
                SECTION 3 – Canaux & investissements
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-3">
                    <span className="text-gray-400 mr-2">7.</span>
                    Quelle est approximativement la répartition paid / organique dans vos actions social/e-commerce ?
                  </label>
                  <div className="space-y-2">
                    {['75% paid', '50/50 paid – organique', '75% organique', 'Je ne sais pas'].map((option) => (
                      <label key={option} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="radio"
                          name="repartition"
                          checked={formData.repartition === option}
                          onChange={() => handleRadioChange('repartition', option)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-3">
                    <span className="text-gray-400 mr-2">8.</span>
                    Quels canaux sont les plus performants aujourd'hui pour générer des ventes / conversions ?
                  </label>
                  <div className="space-y-2">
                    {['TikTok', 'Instagram', 'Meta ads global', 'Pinterest', 'Google ads', 'SEO / contenu éditorial', 'CRM/emailing', 'Marketplace / affiliation'].map((option) => (
                      <label key={option} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={formData.canaux.includes(option)}
                          onChange={() => handleCheckboxChange('canaux', option)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700">{option}</span>
                      </label>
                    ))}
                    <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData.canaux.includes('Autre')}
                        onChange={() => handleCheckboxChange('canaux', 'Autre', true)}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-gray-700">Autre :</span>
                    </label>
                    {showCanauxAutre && (
                      <input
                        type="text"
                        name="canaux_autre"
                        value={formData.canaux_autre}
                        onChange={handleTextChange}
                        placeholder="Précisez"
                        className="ml-7 w-[calc(100%-1.75rem)] px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b-2 border-indigo-100 mb-6">
                SECTION 4 – Perception et évolutions
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-3">
                    <span className="text-gray-400 mr-2">9.</span>
                    Pensez-vous que l'usage du motion/3D va augmenter dans votre secteur ?
                  </label>
                  <div className="space-y-2">
                    {['Oui', 'Peut-être', 'Non'].map((option) => (
                      <label key={option} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="radio"
                          name="motion_3d"
                          checked={formData.motion_3d === option}
                          onChange={() => handleRadioChange('motion_3d', option)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-3">
                    <span className="text-gray-400 mr-2">10.</span>
                    Quels sont aujourd'hui les plus gros obstacles à la production de contenu performant ?
                  </label>
                  <div className="space-y-2">
                    {[
                      'Coût de production',
                      'Délais / rapidité d\'exécution',
                      'Volume / besoin de variations',
                      'Manque de compétences internes',
                      'Cohérence branding / qualité visuelle',
                      'Accès créateurs/influence',
                    ].map((option) => (
                      <label key={option} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={formData.obstacles.includes(option)}
                          onChange={() => handleCheckboxChange('obstacles', option)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700">{option}</span>
                      </label>
                    ))}
                    <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData.obstacles.includes('Autre')}
                        onChange={() => handleCheckboxChange('obstacles', 'Autre', true)}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-gray-700">Autre :</span>
                    </label>
                    {showObstaclesAutre && (
                      <input
                        type="text"
                        name="obstacles_autre"
                        value={formData.obstacles_autre}
                        onChange={handleTextChange}
                        placeholder="Précisez"
                        className="ml-7 w-[calc(100%-1.75rem)] px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b-2 border-indigo-100 mb-6">
                SECTION 5 – Insight libre
              </h2>

              <div>
                <label className="block text-gray-700 mb-2">
                  <span className="text-gray-400 mr-2">11.</span>
                  Selon vous, qu'est-ce que les marques sous-estiment le plus aujourd'hui concernant la performance des contenus en cosmétique/e-commerce ?
                </label>
                <textarea
                  name="insight_libre"
                  value={formData.insight_libre}
                  onChange={handleTextChange}
                  placeholder="Votre réponse..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y"
                />
              </div>
            </section>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Vos données sont traitées de manière confidentielle.
        </p>
      </div>
    </div>
  );
};

export default EcomForm;

