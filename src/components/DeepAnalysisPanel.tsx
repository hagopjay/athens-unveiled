import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, 
  Sparkles, 
  Music, 
  Eye, 
  Users, 
  Clock, 
  Compass,
  Flame,
  BookOpen
} from 'lucide-react';

export const DeepAnalysisPanel = () => {
  const deepThemes = [
    {
      id: 'geometry',
      icon: Compass,
      title: 'The Geometry of Knowledge',
      subtitle: 'Why the Architecture Matters More Than You Think',
      color: 'text-fresco-terracotta',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            The architecture you see is <span className="font-bold text-primary">mathematically impossible</span>. 
            The proportions and perspective create architectural impossibilities—but this is philosophically perfect.
          </p>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Bootstrap Paradox</h4>
              <p className="text-sm text-muted-foreground">
                This painting uses Euclidean geometry to create convincing space—the same geometry 
                Euclid is demonstrating within the painting. The rational system that allows this image 
                to exist is being depicted within the image itself. <span className="italic">Philosophy demonstrating itself.</span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Platonic Form</h4>
              <p className="text-sm text-muted-foreground">
                The building is literally a Platonic Form—a perfect architectural idea that cannot be 
                fully realized in the material world but can be glimpsed through the mind's eye. The 
                painting depicts the realm of Forms by <span className="font-bold">being itself a Form</span>.
              </p>
            </CardContent>
          </Card>
          <div className="border-l-2 border-fresco-gold pl-4">
            <p className="text-sm italic text-muted-foreground">
              "The coffered ceiling creates a visible coordinate system—the universe as the Pythagoreans 
              understood it: fundamentally mathematical, organized by number and ratio, comprehensible through reason."
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'gestures',
      icon: Users,
      title: 'The Choreography of Gestures',
      subtitle: 'Bodies as Arguments',
      color: 'text-fresco-azure',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            Every gesture makes a philosophical point. The painting is a frozen ballet where body language 
            constructs arguments without words.
          </p>
          <div className="grid gap-3">
            <Card className="bg-gradient-to-br from-red-50 to-purple-50 dark:from-red-950/20 dark:to-purple-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Plato's Upward Point</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  Recalls Saint John the Baptist pointing to the divine. Raphael consciously links 
                  Platonic philosophy with Christian theology—Plato's Forms anticipate heaven.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-blue-950/20 dark:to-yellow-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Aristotle's Horizontal Gesture</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  The gesture of calm explanation, demonstrating what is present and observable. 
                  "Look here, consider this, the evidence is before us."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-50 to-stone-50 dark:from-gray-950/20 dark:to-stone-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Diogenes Sprawled</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  The most subversive gesture—sprawled like he's sunbathing. "All of this dignity 
                  and architecture and fine robes is social convention obscuring simple truth."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'light',
      icon: Eye,
      title: 'The Drama of Light',
      subtitle: 'Illumination as Metaphor',
      color: 'text-fresco-gold',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            Light, in both Platonic and Christian thought, is the fundamental metaphor for truth and knowledge. 
            Plato's cave allegory is entirely about the journey from darkness toward light.
          </p>
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fresco-gold" />
                Three Sources of Light
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-1">1. The Distant Sky</p>
                  <p className="text-sm text-muted-foreground">
                    Ultimate truth—luminous but unreachable. The source of all illumination remains 
                    beyond human grasp, flooding the scene but staying infinitely distant.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">2. Inner Illumination</p>
                  <p className="text-sm text-muted-foreground">
                    Foreground figures seem internally lit by their knowledge. Each philosopher becomes 
                    a local source of light—the light of individual genius, of discovered knowledge.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">3. Golden Architecture</p>
                  <p className="text-sm text-muted-foreground">
                    The rational structure itself glows. When you understand the Form, when you grasp 
                    the mathematical principle, you experience illumination. The bright architecture 
                    represents the brightness of understanding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'music',
      icon: Music,
      title: 'The Musical Substructure',
      subtitle: 'Pythagorean Harmony Made Visual',
      color: 'text-fresco-terracotta',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            Pythagoras discovered that musical harmony corresponds to simple mathematical ratios. 
            This wasn't just interesting—it was a <span className="font-bold">revelation about the structure of reality itself</span>.
          </p>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Mathematical Ratios</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-background rounded">
                  <span>Octave</span>
                  <Badge variant="outline">2:1</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-background rounded">
                  <span>Perfect Fifth</span>
                  <Badge variant="outline">3:2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-background rounded">
                  <span>Perfect Fourth</span>
                  <Badge variant="outline">4:3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">Visual Harmony</h4>
              <p className="text-sm text-muted-foreground">
                Raphael composes the entire painting using these same principles. The spacing between 
                figures creates intervals like musical intervals. The painting has visual harmony in 
                the same way a symphony has auditory harmony—derived from proportional relationships, 
                from mathematical ratios embedded in the composition.
              </p>
              <p className="text-sm font-medium text-foreground mt-3">
                The painting doesn't just depict the idea that reality is mathematical—it proves it 
                by being a mathematically structured reality.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'time',
      icon: Clock,
      title: 'The Temporal Collapse',
      subtitle: 'All of History Present Simultaneously',
      color: 'text-fresco-sky',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            The figures in this painting lived across <span className="font-bold text-primary">nearly a thousand years</span> of 
            history. They never could have met. Yet here they all stand in the same room, in real-time conversation.
          </p>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Philosophical Argument</h4>
              <p className="text-sm text-muted-foreground">
                This isn't historical error—it's philosophical argument. Raphael claims that philosophical 
                truth exists outside of time, that ideas transcend their historical moments, that minds 
                separated by centuries can genuinely communicate through their works.
              </p>
              <div className="border-l-2 border-fresco-sky pl-4 mt-3">
                <p className="text-sm italic">
                  When you read Plato today, you're in dialogue with him—not with a dead author from 
                  the distant past but with a living intelligence encountering yours through the text.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">Renaissance Faces on Ancient Bodies</h4>
              <p className="text-sm text-muted-foreground">
                Leonardo-as-Plato, Michelangelo-as-Heraclitus. The same intellectual spirit animates 
                both men across the centuries. The questions philosophy asks are perennial, not historical. 
                By standing in the same space, by sharing faces, the moderns assert that they're not 
                merely recovering ancient knowledge but continuing it, perhaps even surpassing it.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'gender',
      icon: Users,
      title: 'The Gendered Space',
      subtitle: 'The Absence That Haunts the Painting',
      color: 'text-destructive',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            In a gathering of fifty figures representing the greatest minds of antiquity, we have 
            possibly <span className="font-bold">one woman</span>—Hypatia—marginalized to the edge. 
            This absence is historically accurate but philosophically devastating.
          </p>
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm text-destructive">Hypatia's Story</h4>
              <p className="text-sm text-muted-foreground">
                A brilliant mathematician and philosopher in Alexandria, beloved as a teacher. Murdered 
                by a Christian mob in 415 CE, her body dragged through the streets, because she represented 
                pagan learning and because her intellectual authority threatened patriarchal religious power.
              </p>
              <p className="text-sm font-medium mt-3">
                If Raphael included her, he's making a subtle but sharp critique: philosophy's greatest 
                minds included women, but they were killed for it.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Philosophical Impoverishment</h4>
              <p className="text-sm text-muted-foreground">
                If wisdom requires both reason and emotion, both abstraction and embodiment, both the 
                transcendent and the material, then an all-male philosophical tradition is necessarily 
                incomplete. What truths went undiscovered because half of humanity was barred from the conversation?
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'niches',
      icon: BookOpen,
      title: 'The Empty Niches',
      subtitle: 'The Absent Gods',
      color: 'text-muted-foreground',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            In the background architecture, niches that would contain statues of gods in a Roman building 
            are <span className="font-bold">conspicuously empty</span>. Why?
          </p>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">Philosophy Has Displaced Mythology</h4>
              <p className="text-sm text-muted-foreground">
                Rational inquiry has replaced religious superstition. These philosophers don't need gods 
                in statues because they seek truth through reason. The empty niches signal the secular 
                nature of philosophy—human reason needs no divine statues.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Complementary Fresco</h4>
              <p className="text-sm text-muted-foreground">
                Directly across the room hangs "The Disputation of the Holy Sacrament," showing Christian 
                theologians with Christ enthroned above. The empty niches in the School of Athens are 
                filled by the divine presence in the facing fresco.
              </p>
              <p className="text-sm font-medium mt-3">
                You cannot look at both paintings simultaneously. You must turn from one to the other, 
                physically enacting the turning from philosophy to theology, from reason to faith.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'conversation',
      icon: Flame,
      title: 'The Unfinished Conversation',
      subtitle: 'What Plato and Aristotle Are Actually Saying',
      color: 'text-fresco-terracotta',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            Plato and Aristotle aren't just posing—they're <span className="font-bold">in mid-conversation, 
            mid-step, mid-argument</span>. They're walking toward us from that distant bright background, 
            but they haven't arrived yet.
          </p>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">Philosophy as Journey</h4>
              <p className="text-sm text-muted-foreground">
                They're approaching but haven't reached their destination. The greatest philosophers are 
                still traveling, still seeking, still in process. They're moving toward us—toward the 
                future, toward later generations—bringing their wisdom forward through time.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                But they're also walking from the light toward the shadowed foreground where we viewers 
                stand. They're bringing enlightenment down from the heights, but that wisdom must descend 
                from abstraction into application, from the ideal into the real.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-blue-50 dark:from-red-950/20 dark:to-blue-950/20">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">Ongoing Disagreement</h4>
              <p className="text-sm text-muted-foreground">
                Their gestures aren't complementary—they're contradictory. One says "look up," the other 
                says "look here." They're arguing, but they're doing it while walking together, remaining 
                in relationship despite disagreement.
              </p>
              <div className="border-l-2 border-primary pl-4 mt-3">
                <p className="text-sm font-medium">
                  This is the ideal of philosophical discourse: you can fundamentally disagree with 
                  someone and still walk beside them, still pursue truth together. The painting doesn't 
                  resolve their disagreement because it can't be resolved; it must be held in productive tension.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'viewer',
      icon: Eye,
      title: 'The Viewer\'s Position',
      subtitle: 'Where Do You Stand?',
      color: 'text-primary',
      content: (
        <div className="space-y-4">
          <Card className="bg-gradient-gold/10 border-fresco-gold">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-base">You Are Part of This</h4>
              <p className="text-sm text-muted-foreground">
                The perspective is constructed so the vanishing point is at eye level for a standing viewer. 
                You're positioned spatially as if you're in the same space as these figures—not looking at 
                a representation but <span className="font-bold">present in it</span>.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Invitation</h4>
              <p className="text-sm text-muted-foreground">
                The figures in the foreground turn toward you, acknowledging your presence. You're not 
                an invisible observer but a participant. You too are a student in this academy. The 
                painting invites you to join the conversation, to begin your own philosophical education, 
                to start climbing the stairs.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
            <CardContent className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm">The Portal Between Worlds</h4>
              <p className="text-sm text-muted-foreground">
                You stand simultaneously inside the painting's imaginary ancient academy and inside a 
                Renaissance room filled with texts. Past and present merge. The painting becomes a portal 
                between worlds, between eras, between the ideal and the real.
              </p>
              <div className="border-l-2 border-fresco-gold pl-4 mt-4">
                <p className="text-sm italic font-medium">
                  Every time someone stands before this work and tries to understand what they're seeing, 
                  the school is in session again, and the conversation continues.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-serif">Deep Analysis</h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Explore the profound intellectual architecture underlying Raphael's masterpiece—dimensions 
          that reveal how it functions as a complete philosophical system, not just a portrait gallery.
        </p>
      </div>
      
      <Tabs defaultValue={deepThemes[0].id} className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2 h-auto p-2">
          {deepThemes.slice(0, 5).map(theme => {
            const Icon = theme.icon;
            return (
              <TabsTrigger 
                key={theme.id} 
                value={theme.id}
                className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-gold"
              >
                <Icon className={`w-4 h-4 ${theme.color}`} />
                <span className="text-xs hidden sm:inline">{theme.title.split(':')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-2 mt-2">
          {deepThemes.slice(5).map(theme => {
            const Icon = theme.icon;
            return (
              <TabsTrigger 
                key={theme.id} 
                value={theme.id}
                className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-gold"
              >
                <Icon className={`w-4 h-4 ${theme.color}`} />
                <span className="text-xs hidden sm:inline">{theme.title.split(':')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {deepThemes.map(theme => {
          const Icon = theme.icon;
          return (
            <TabsContent key={theme.id} value={theme.id} className="mt-6 animate-fade-in">
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-marble ${theme.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-serif">{theme.title}</CardTitle>
                      <CardDescription className="text-base mt-1">{theme.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {theme.content}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
