/** Reference content for Study Tools: commentary notes, places, and terms. */

export type CommentaryEntry = {
  id: string
  book: string
  chapter: number
  range: string
  heading: string
  body: string
}

export const COMMENTARIES: CommentaryEntry[] = [
  {
    id: 'phil-4-4-9',
    book: 'Philippians',
    chapter: 4,
    range: '4:4–9',
    heading: 'Anxious for nothing',
    body: 'Paul writes this from custody, not from comfort. The instruction is not to feel differently but to do something specific: bring the request. "In every thing by prayer and supplication with thanksgiving" names three actions, and the promise that follows is a guard — a garrison word, borrowed from the soldier at the gate — set over the heart and mind rather than over the circumstances.',
  },
  {
    id: 'phil-1-6',
    book: 'Philippians',
    chapter: 1,
    range: '1:6',
    heading: 'He will finish it',
    body: 'The confidence in this verse is not in the Philippians and not in Paul. The one who began the work is the one who completes it, and the completion is dated to a day none of them will set. For anyone measuring themselves by how little progress they can see this week, the timescale here is deliberately long.',
  },
  {
    id: 'psalm-23',
    book: 'Psalms',
    chapter: 23,
    range: '23:1–6',
    heading: 'Through, not around',
    body: 'The psalm changes person in verse 4. Up to the valley, God is spoken about — he leads, he restores. In the valley, God is spoken to: "thou art with me." The shift is the point. Nearness is not the reward for getting through; it is what carries you through.',
  },
  {
    id: 'psalm-42',
    book: 'Psalms',
    chapter: 42,
    range: '42:1–11',
    heading: 'Talking to yourself',
    body: 'Twice the psalmist interrogates his own soul: "Why art thou cast down?" He does not deny the downcast state, and he does not indulge it either. He preaches to himself, and the verb he lands on is future — "I shall yet praise him" — which is a very different thing from claiming to feel it now.',
  },
  {
    id: 'john-14-27',
    book: 'John',
    chapter: 14,
    range: '14:27',
    heading: 'Not as the world gives',
    body: 'Spoken hours before the arrest. The peace offered here is explicitly unlike the world\'s version, which arrives only when threats are removed. This peace is handed over while the threat is still standing — which is why the sentence ends with an instruction about the heart rather than about the danger.',
  },
  {
    id: 'isaiah-40-31',
    book: 'Isaiah',
    chapter: 40,
    range: '40:28–31',
    heading: 'They that wait',
    body: 'The Hebrew behind "wait" carries the sense of a cord pulled taut — tension, not passivity. The famous order of the images descends rather than climbs: mount up, then run, then walk. Ordinary walking without fainting is the last and hardest promise, and the one most people in a long season actually need.',
  },
  {
    id: 'matthew-11-28',
    book: 'Matthew',
    chapter: 11,
    range: '11:28–30',
    heading: 'The easy yoke',
    body: 'A yoke is still work; the offer is not the end of labour but a change of what you are harnessed to. "Learn of me" makes rest an apprenticeship rather than a mood — something practised, badly at first, over time.',
  },
  {
    id: 'romans-8-28',
    book: 'Romans',
    chapter: 8,
    range: '8:26–28',
    heading: 'When you cannot pray',
    body: 'The context of the famous verse 28 is verse 26: we do not know what to pray for, and the Spirit intercedes with groanings. The promise about all things working together sits directly on top of an admission that the sufferer cannot form the words. Being inarticulate before God is anticipated here, not penalised.',
  },
]

export type Place = {
  id: string
  name: string
  region: string
  summary: string
  appears: string
  /** Rough position on the schematic map, 0–100 of the plate. */
  x: number
  y: number
}

export const PLACES: Place[] = [
  { id: 'jerusalem', name: 'Jerusalem', region: 'Judea', x: 34, y: 62, appears: 'Throughout', summary: 'The city of the temple, the crucifixion and the first church. Both the place of deepest loss and the place the story turns.' },
  { id: 'bethlehem', name: 'Bethlehem', region: 'Judea', x: 33, y: 67, appears: 'Ruth, Micah 5, Luke 2', summary: 'A small town, twice overlooked and twice chosen — for David and then for Jesus.' },
  { id: 'nazareth', name: 'Nazareth', region: 'Galilee', x: 35, y: 44, appears: 'Luke 1–2, Mark 6', summary: 'An unremarkable village with a bad reputation ("can any good thing come out of Nazareth?"). Home for roughly thirty years.' },
  { id: 'galilee', name: 'Sea of Galilee', region: 'Galilee', x: 44, y: 43, appears: 'The Gospels', summary: 'A freshwater lake prone to sudden violent squalls — the setting for the storm the disciples were sure would drown them.' },
  { id: 'jordan', name: 'River Jordan', region: 'Jordan Valley', x: 42, y: 55, appears: 'Joshua 3, Matthew 3', summary: 'The crossing into the promised land, and centuries later the place of baptism. A boundary that keeps marking new beginnings.' },
  { id: 'philippi', name: 'Philippi', region: 'Macedonia', x: 16, y: 20, appears: 'Acts 16, Philippians', summary: 'A Roman colony in Macedonia. Paul was beaten and jailed here; the letter he later wrote to this church is the one about joy.' },
  { id: 'rome', name: 'Rome', region: 'Italy', x: 6, y: 26, appears: 'Acts 28, Romans', summary: 'The imperial capital, and the place Paul wrote from under guard. Philippians was probably written in this custody.' },
  { id: 'patmos', name: 'Patmos', region: 'Aegean', x: 22, y: 36, appears: 'Revelation 1', summary: 'A small rocky island of exile. The vision of the new heaven and new earth was given to a man who had been removed from everything.' },
  { id: 'egypt', name: 'Egypt', region: 'North Africa', x: 26, y: 84, appears: 'Exodus, Matthew 2', summary: 'The house of slavery in one testament and the refuge for a hunted child in the next.' },
  { id: 'babylon', name: 'Babylon', region: 'Mesopotamia', x: 72, y: 58, appears: '2 Kings 25, Psalm 137, Daniel', summary: 'The place of exile. Psalm 137 is what faith sounds like when you cannot sing.' },
  { id: 'sinai', name: 'Mount Sinai', region: 'Sinai Peninsula', x: 33, y: 88, appears: 'Exodus 19–20, 1 Kings 19', summary: 'Where the law was given in fire and smoke — and where, generations later, Elijah heard God in a whisper instead.' },
  { id: 'damascus', name: 'Damascus', region: 'Syria', x: 50, y: 34, appears: 'Acts 9', summary: 'The road that changed Paul from the church\'s worst enemy to its most travelled missionary.' },
]

export type Term = {
  id: string
  term: string
  pronunciation?: string
  definition: string
  seeAlso: string
}

export const DICTIONARY: Term[] = [
  { id: 'grace', term: 'Grace', pronunciation: 'charis', definition: 'Favour that is given rather than earned. In the New Testament it is not leniency about wrongdoing but active generosity toward people who have no claim on it.', seeAlso: 'Ephesians 2:8–9' },
  { id: 'peace', term: 'Peace', pronunciation: 'shalom / eirene', definition: 'Not merely the absence of conflict but wholeness — relationships, body and mind set right. This is why peace can be promised inside a storm rather than after it.', seeAlso: 'Philippians 4:7' },
  { id: 'lament', term: 'Lament', definition: 'A form of prayer that complains to God rather than about him. Roughly a third of the psalms are laments, which makes honest grief a scriptural practice, not a failure of faith.', seeAlso: 'Psalm 13' },
  { id: 'repentance', term: 'Repentance', pronunciation: 'metanoia', definition: 'A change of mind that turns into a change of direction. The emphasis is on the turn, not on feeling bad.', seeAlso: 'Acts 3:19' },
  { id: 'redeem', term: 'Redeem', definition: 'To buy back — the word came from the marketplace and from slavery. Redemption assumes a real cost paid by someone else.', seeAlso: 'Ruth 4; Galatians 3:13' },
  { id: 'covenant', term: 'Covenant', definition: 'A binding relationship with promises attached, closer to a marriage than a contract. God initiates every covenant in scripture.', seeAlso: 'Genesis 15; Luke 22:20' },
  { id: 'righteousness', term: 'Righteousness', definition: 'Being in right relationship — with God and with people. It describes a standing that is given, and then a way of living that follows.', seeAlso: 'Romans 3:22' },
  { id: 'hesed', term: 'Hesed', pronunciation: 'kheh-sed', definition: 'Steadfast, loyal love. Often rendered "mercy" or "lovingkindness" in the KJV. It is love that keeps its commitments when the other party has not.', seeAlso: 'Psalm 23:6' },
  { id: 'sabbath', term: 'Sabbath', definition: 'A commanded stop. One day in seven when work is set down as an act of trust that the world keeps going without you.', seeAlso: 'Exodus 20:8–11' },
  { id: 'gospel', term: 'Gospel', pronunciation: 'euangelion', definition: 'Good news — originally the announcement of a victory or a royal accession, not advice about how to live.', seeAlso: 'Mark 1:1' },
  { id: 'faith', term: 'Faith', pronunciation: 'pistis', definition: 'Trust placed in someone, closer to leaning your weight on a chair than to being certain about a claim. It can coexist with doubt.', seeAlso: 'Mark 9:24; Hebrews 11:1' },
  { id: 'exile', term: 'Exile', definition: 'Forced displacement from home. Much of the Old Testament is written by or for people in exile, which is why it speaks so directly to seasons of dislocation.', seeAlso: 'Jeremiah 29:4–7' },
  { id: 'intercession', term: 'Intercession', definition: 'Praying on behalf of someone else. Romans 8 says the Spirit does this for you when you have run out of words.', seeAlso: 'Romans 8:26–27' },
  { id: 'psalm', term: 'Psalm', definition: 'A song for worship. The Psalter is the Bible\'s prayer book, containing praise, protest, confession and complaint side by side.', seeAlso: 'Psalms 1–150' },
  { id: 'yoke', term: 'Yoke', definition: 'A wooden frame joining two animals for work. Jesus offers his own yoke as an exchange for a heavier one — not as a release from all labour.', seeAlso: 'Matthew 11:29–30' },
  { id: 'refuge', term: 'Refuge', definition: 'A place of shelter from pursuit. Israel had literal cities of refuge; the psalms make the word a name for God himself.', seeAlso: 'Psalm 46:1' },
]
