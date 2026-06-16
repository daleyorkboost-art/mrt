import { Check, Copy, ImagePlus, UploadCloud } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SelectField } from '../components/FormControls';
import { PageShell } from '../components/PageShell';
import { SectionHeader } from '../components/SectionHeader';
import { captionIdeas, pageMeta } from '../data/mockData';

export function CaptionGeneratorPage() {
  const [style, setStyle] = useState('Luxury');
  const [mood, setMood] = useState('Golden hour');
  const [preview, setPreview] = useState<string>('');
  const [copied, setCopied] = useState('');

  const captions = useMemo(
    () => {
      const compactStyle = style.replace(/\s+/g, '');
      const compactMood = mood.replace(/\s+/g, '');
      return captionIdeas.map((caption) => `${caption} #MyGlobalTrips #${compactStyle}Travel #${compactMood}`);
    },
    [mood, style],
  );

  function handleFile(file?: File) {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  async function copy(text: string) {
    await navigator.clipboard?.writeText(text);
    setCopied(text);
    window.setTimeout(() => setCopied(''), 1400);
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader {...pageMeta.captions} align="center" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit p-6">
            <label
              className="grid min-h-72 cursor-pointer place-items-center rounded-[8px] border border-dashed border-gold/45 bg-white/8 p-6 text-center transition hover:bg-white/12"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFile(event.dataTransfer.files[0]);
              }}
            >
              <input
                accept="image/*"
                className="sr-only"
                type="file"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />
              {preview ? (
                <img alt="Uploaded travel preview" className="h-64 w-full rounded-[8px] object-cover" src={preview} />
              ) : (
                <span>
                  <UploadCloud aria-hidden className="mx-auto h-12 w-12 text-gold" />
                  <span className="mt-4 block font-display text-2xl font-bold">Drop travel image</span>
                  <span className="mt-2 block text-sm text-mist">Upload zone with instant image preview</span>
                </span>
              )}
            </label>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <SelectField label="Style" value={style} options={['Luxury', 'Playful', 'Romantic', 'Corporate', 'Influencer']} onChange={setStyle} />
              <SelectField label="Mood" value={mood} options={['Golden hour', 'Calm', 'Celebratory', 'Dreamy', 'Bold']} onChange={setMood} />
            </div>
          </Card>

          <div className="grid gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <ImagePlus aria-hidden className="h-6 w-6 text-gold" />
                <div>
                  <h2 className="font-display text-3xl font-bold">Generated captions</h2>
                  <p className="text-sm text-mist">Mock AI output tuned for {style.toLowerCase()} travel content.</p>
                </div>
              </div>
            </Card>
            {captions.map((caption) => (
              <Card key={caption} className="p-5">
                <p className="text-lg leading-8 text-white">{caption}</p>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => copy(caption)} variant={copied === caption ? 'primary' : 'secondary'}>
                    {copied === caption ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
                    {copied === caption ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
