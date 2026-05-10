import React, { useState, useMemo, useEffect, createContext, useContext, useCallback } from 'react';
import { Search, X, Filter, Bookmark, BookmarkCheck, ChevronRight, Crown, MapPin, Skull, Star, Shield, Cloud, Eye, Heart, Building2, Wrench, Wind, ExternalLink, ImageOff, BookOpen, Layers, AlertTriangle, CheckCircle2, Plus, Minus, Trash2, Library, Sparkles, Brain, Zap as ZapIcon, Activity, ArrowRight, Loader2, Network, GitBranch, Flame, Target, Info, Lightbulb, TrendingUp, Award, Compass, Swords, Share2, Command, Crosshair, ShieldAlert } from 'lucide-react';
import CommandPalette from './CommandPalette.jsx';
import ShareBanner from './ShareBanner.jsx';
import { readShareFromHash, clearShareHash, buildShareUrl } from './share.js';
import { ENRICHED_GENERATED as ENRICHED } from './enriched-data.js';

const CARDS = [{"id":"001-000","name":"Roman Volkov, the Exile","setid":"001","cardid":"000","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/000","url":"https://warsaken.cards/001/full/000"},{"id":"001-001","name":"Chancellor Lockwood","setid":"001","cardid":"001","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/001","url":"https://warsaken.cards/001/full/001"},{"id":"001-002","name":"Baron Valorin","setid":"001","cardid":"002","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/002","url":"https://warsaken.cards/001/full/002"},{"id":"001-003","name":"Zain Lion\u00e9","setid":"001","cardid":"003","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/003","url":"https://warsaken.cards/001/full/003"},{"id":"001-004","name":"President Zeana","setid":"001","cardid":"004","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/004","url":"https://warsaken.cards/001/full/004"},{"id":"001-005","name":"Thato Lathabo","setid":"001","cardid":"005","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/005","url":"https://warsaken.cards/001/full/005"},{"id":"001-006","name":"Premier Zoff","setid":"001","cardid":"006","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/006","url":"https://warsaken.cards/001/full/006"},{"id":"001-007","name":"Queen Awati","setid":"001","cardid":"007","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/007","url":"https://warsaken.cards/001/full/007"},{"id":"001-008","name":"Great Emperor Shang Lee","setid":"001","cardid":"008","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/008","url":"https://warsaken.cards/001/full/008"},{"id":"001-009","name":"Wolf Power District","setid":"001","cardid":"009","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/009","url":"https://warsaken.cards/001/full/009"},{"id":"001-010","name":"Pons Research Centers","setid":"001","cardid":"010","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/010","url":"https://warsaken.cards/001/full/010"},{"id":"001-011","name":"Biofuel Research Farms","setid":"001","cardid":"011","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/011","url":"https://warsaken.cards/001/full/011"},{"id":"001-012","name":"Mt. Uptania Production Site","setid":"001","cardid":"012","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/012","url":"https://warsaken.cards/001/full/012"},{"id":"001-013","name":"Golden Farmlands","setid":"001","cardid":"013","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/013","url":"https://warsaken.cards/001/full/013"},{"id":"001-014","name":"Dryton Oil Fields","setid":"001","cardid":"014","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/014","url":"https://warsaken.cards/001/full/014"},{"id":"001-015","name":"Fermi Energy Plants","setid":"001","cardid":"015","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/015","url":"https://warsaken.cards/001/full/015"},{"id":"001-016","name":"St. Purcell Harbor","setid":"001","cardid":"016","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/016","url":"https://warsaken.cards/001/full/016"},{"id":"001-017","name":"Mt. Pom\u00e9 Orchards","setid":"001","cardid":"017","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/017","url":"https://warsaken.cards/001/full/017"},{"id":"001-018","name":"Nuclear Blast","setid":"001","cardid":"018","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/018","url":"https://warsaken.cards/001/full/018"},{"id":"001-019","name":"CX5 Viral Outbreak","setid":"001","cardid":"019","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/019","url":"https://warsaken.cards/001/full/019"},{"id":"001-020","name":"EMP Discharge","setid":"001","cardid":"020","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/020","url":"https://warsaken.cards/001/full/020"},{"id":"001-021","name":"Nuclear Aftermath","setid":"001","cardid":"021","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/021","url":"https://warsaken.cards/001/full/021"},{"id":"001-022","name":"Sub Launched Attack","setid":"001","cardid":"022","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/022","url":"https://warsaken.cards/001/full/022"},{"id":"001-023","name":"Chemical Augmentation","setid":"001","cardid":"023","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/023","url":"https://warsaken.cards/001/full/023"},{"id":"001-024","name":"Kinetic Space Strike","setid":"001","cardid":"024","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/024","url":"https://warsaken.cards/001/full/024"},{"id":"001-025","name":"Orbital Sun Cannon","setid":"001","cardid":"025","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/025","url":"https://warsaken.cards/001/full/025"},{"id":"001-026","name":"Infected Water Supply","setid":"001","cardid":"026","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/026","url":"https://warsaken.cards/001/full/026"},{"id":"001-027","name":"Ion Particle Cannon","setid":"001","cardid":"027","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/027","url":"https://warsaken.cards/001/full/027"},{"id":"001-028","name":"Specialist Dexter Smith","setid":"001","cardid":"028","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/028","url":"https://warsaken.cards/001/full/028"},{"id":"001-029","name":"Sergeant Vladimir Orlov","setid":"001","cardid":"029","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/029","url":"https://warsaken.cards/001/full/029"},{"id":"001-030","name":"Private Sara Yvette","setid":"001","cardid":"030","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/030","url":"https://warsaken.cards/001/full/030"},{"id":"001-031","name":"Agent Zarah Zivai","setid":"001","cardid":"031","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/031","url":"https://warsaken.cards/001/full/031"},{"id":"001-032","name":"DX-8","setid":"001","cardid":"032","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/032","url":"https://warsaken.cards/001/full/032"},{"id":"001-033","name":"Agent Rico Vidal","setid":"001","cardid":"033","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/033","url":"https://warsaken.cards/001/full/033"},{"id":"001-034","name":"Agent Nika Devin","setid":"001","cardid":"034","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/034","url":"https://warsaken.cards/001/full/034"},{"id":"001-035","name":"Bella Ivanova, Forsaken","setid":"001","cardid":"035","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/035","url":"https://warsaken.cards/001/full/035"},{"id":"001-036","name":"Captured Leader","setid":"001","cardid":"036","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/036","url":"https://warsaken.cards/001/full/036"},{"id":"001-037","name":"Abandoned Forces","setid":"001","cardid":"037","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/037","url":"https://warsaken.cards/001/full/037"},{"id":"001-038","name":"Private John Blackthorn","setid":"001","cardid":"038","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/038","url":"https://warsaken.cards/001/full/038"},{"id":"001-039","name":"Specialist Upton Cobani","setid":"001","cardid":"039","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/039","url":"https://warsaken.cards/001/full/039"},{"id":"001-040","name":"Azar Cyrus, Fabricator","setid":"001","cardid":"040","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/040","url":"https://warsaken.cards/001/full/040"},{"id":"001-041","name":"Igor Bok, Electrical Engineer","setid":"001","cardid":"041","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/041","url":"https://warsaken.cards/001/full/041"},{"id":"001-042","name":"Jon Rider, Oil Engineer","setid":"001","cardid":"042","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/042","url":"https://warsaken.cards/001/full/042"},{"id":"001-043","name":"Mai Saki, Food Scientist","setid":"001","cardid":"043","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/043","url":"https://warsaken.cards/001/full/043"},{"id":"001-044","name":"Nameless Soldier","setid":"001","cardid":"044","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/044","url":"https://warsaken.cards/001/full/044"},{"id":"001-045","name":"Corporal Mark Rockwell","setid":"001","cardid":"045","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/045","url":"https://warsaken.cards/001/full/045"},{"id":"001-046","name":"Nathan Smith, Metallurgist","setid":"001","cardid":"046","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/046","url":"https://warsaken.cards/001/full/046"},{"id":"001-047","name":"Reza Naveed, Air Defense","setid":"001","cardid":"047","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/047","url":"https://warsaken.cards/001/full/047"},{"id":"001-048","name":"Abel Jabari, Demolitions","setid":"001","cardid":"048","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/048","url":"https://warsaken.cards/001/full/048"},{"id":"001-049","name":"Specialist Chloe Moore","setid":"001","cardid":"049","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/049","url":"https://warsaken.cards/001/full/049"},{"id":"001-050","name":"Sergeant Mickey Blackstone","setid":"001","cardid":"050","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/050","url":"https://warsaken.cards/001/full/050"},{"id":"001-051","name":"G6-R75","setid":"001","cardid":"051","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/051","url":"https://warsaken.cards/001/full/051"},{"id":"001-052","name":"5R-34i","setid":"001","cardid":"052","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/052","url":"https://warsaken.cards/001/full/052"},{"id":"001-053","name":"GR Ultimate","setid":"001","cardid":"053","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/053","url":"https://warsaken.cards/001/full/053"},{"id":"001-054","name":"W1-MG","setid":"001","cardid":"054","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/054","url":"https://warsaken.cards/001/full/054"},{"id":"001-055","name":"APEX-55 Mech","setid":"001","cardid":"055","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/055","url":"https://warsaken.cards/001/full/055"},{"id":"001-056","name":"Goliath 65","setid":"001","cardid":"056","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/056","url":"https://warsaken.cards/001/full/056"},{"id":"001-057","name":"Z27 Tiger","setid":"001","cardid":"057","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/057","url":"https://warsaken.cards/001/full/057"},{"id":"001-058","name":"Panther RII","setid":"001","cardid":"058","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/058","url":"https://warsaken.cards/001/full/058"},{"id":"001-059","name":"XT-T APC","setid":"001","cardid":"059","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/059","url":"https://warsaken.cards/001/full/059"},{"id":"001-060","name":"Cheetah Z-Series","setid":"001","cardid":"060","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/060","url":"https://warsaken.cards/001/full/060"},{"id":"001-061","name":"X6 Scorpion","setid":"001","cardid":"061","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/061","url":"https://warsaken.cards/001/full/061"},{"id":"001-062","name":"VX Wasp","setid":"001","cardid":"062","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/062","url":"https://warsaken.cards/001/full/062"},{"id":"001-063","name":"A1 Poseidon Carrier","setid":"001","cardid":"063","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/063","url":"https://warsaken.cards/001/full/063"},{"id":"001-064","name":"A4 Revenge Super Carrier","setid":"001","cardid":"064","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/064","url":"https://warsaken.cards/001/full/064"},{"id":"001-065","name":"Isle Protector A8","setid":"001","cardid":"065","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/065","url":"https://warsaken.cards/001/full/065"},{"id":"001-066","name":"ZP-C Shark","setid":"001","cardid":"066","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/066","url":"https://warsaken.cards/001/full/066"},{"id":"001-067","name":"B6 Rabid Beast","setid":"001","cardid":"067","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/067","url":"https://warsaken.cards/001/full/067"},{"id":"001-068","name":"GR Current","setid":"001","cardid":"068","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/068","url":"https://warsaken.cards/001/full/068"},{"id":"001-069","name":"ZS Wolf","setid":"001","cardid":"069","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/069","url":"https://warsaken.cards/001/full/069"},{"id":"001-070","name":"RKX Ghost Manta","setid":"001","cardid":"070","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/070","url":"https://warsaken.cards/001/full/070"},{"id":"001-071","name":"GR Viper","setid":"001","cardid":"071","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/071","url":"https://warsaken.cards/001/full/071"},{"id":"001-072","name":"D24i","setid":"001","cardid":"072","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/072","url":"https://warsaken.cards/001/full/072"},{"id":"001-073","name":"AX Strike Fighter","setid":"001","cardid":"073","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/073","url":"https://warsaken.cards/001/full/073"},{"id":"001-074","name":"RR-5 Pulse","setid":"001","cardid":"074","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/074","url":"https://warsaken.cards/001/full/074"},{"id":"001-075","name":"Falcon R2","setid":"001","cardid":"075","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/075","url":"https://warsaken.cards/001/full/075"},{"id":"001-076","name":"GR Hornet","setid":"001","cardid":"076","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/076","url":"https://warsaken.cards/001/full/076"},{"id":"001-077","name":"S21-R","setid":"001","cardid":"077","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/077","url":"https://warsaken.cards/001/full/077"},{"id":"001-078","name":"E7 Night Eagle","setid":"001","cardid":"078","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/078","url":"https://warsaken.cards/001/full/078"},{"id":"001-079","name":"101X Prototype","setid":"001","cardid":"079","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/079","url":"https://warsaken.cards/001/full/079"},{"id":"001-080","name":"V Type-X","setid":"001","cardid":"080","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/080","url":"https://warsaken.cards/001/full/080"},{"id":"001-081","name":"eS-4 Desert Bighorn","setid":"001","cardid":"081","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/081","url":"https://warsaken.cards/001/full/081"},{"id":"001-082","name":"H5 Drop Ship","setid":"001","cardid":"082","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/082","url":"https://warsaken.cards/001/full/082"},{"id":"001-083","name":"Hacked Network","setid":"001","cardid":"083","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/083","url":"https://warsaken.cards/001/full/083"},{"id":"001-084","name":"Search Algorithm","setid":"001","cardid":"084","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/084","url":"https://warsaken.cards/001/full/084"},{"id":"001-085","name":"Diversionary Tactic","setid":"001","cardid":"085","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/085","url":"https://warsaken.cards/001/full/085"},{"id":"001-086","name":"Assassination Attempt","setid":"001","cardid":"086","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/086","url":"https://warsaken.cards/001/full/086"},{"id":"001-087","name":"Successful Mole Hunt","setid":"001","cardid":"087","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/087","url":"https://warsaken.cards/001/full/087"},{"id":"001-088","name":"Satellite Recon","setid":"001","cardid":"088","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/088","url":"https://warsaken.cards/001/full/088"},{"id":"001-089","name":"Secret Drone Mission","setid":"001","cardid":"089","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/089","url":"https://warsaken.cards/001/full/089"},{"id":"001-090","name":"Planted Device","setid":"001","cardid":"090","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/090","url":"https://warsaken.cards/001/full/090"},{"id":"001-091","name":"Timed Detonation","setid":"001","cardid":"091","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/091","url":"https://warsaken.cards/001/full/091"},{"id":"001-092","name":"Pulled Critical Part","setid":"001","cardid":"092","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/092","url":"https://warsaken.cards/001/full/092"},{"id":"001-093","name":"Field Research","setid":"001","cardid":"093","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/093","url":"https://warsaken.cards/001/full/093"},{"id":"001-094","name":"Novel Platform","setid":"001","cardid":"094","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/094","url":"https://warsaken.cards/001/full/094"},{"id":"001-095","name":"Optimized Outcome","setid":"001","cardid":"095","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/095","url":"https://warsaken.cards/001/full/095"},{"id":"001-096","name":"Targeted Sabotage","setid":"001","cardid":"096","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/096","url":"https://warsaken.cards/001/full/096"},{"id":"001-097","name":"Restored Vehicle","setid":"001","cardid":"097","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/097","url":"https://warsaken.cards/001/full/097"},{"id":"001-098","name":"Clever Hijack","setid":"001","cardid":"098","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/098","url":"https://warsaken.cards/001/full/098"},{"id":"001-099","name":"Sent Architectural Plan","setid":"001","cardid":"099","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/099","url":"https://warsaken.cards/001/full/099"},{"id":"001-100","name":"Destructive Hijacking","setid":"001","cardid":"100","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/100","url":"https://warsaken.cards/001/full/100"},{"id":"001-101","name":"Subversion Tactic","setid":"001","cardid":"101","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/101","url":"https://warsaken.cards/001/full/101"},{"id":"001-102","name":"Calculated Stagnation","setid":"001","cardid":"102","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/102","url":"https://warsaken.cards/001/full/102"},{"id":"001-103","name":"Security Upgrade","setid":"001","cardid":"103","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/103","url":"https://warsaken.cards/001/full/103"},{"id":"001-104","name":"Cut Corners","setid":"001","cardid":"104","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/104","url":"https://warsaken.cards/001/full/104"},{"id":"001-105","name":"Rebuild the Territory","setid":"001","cardid":"105","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/105","url":"https://warsaken.cards/001/full/105"},{"id":"001-106","name":"Strategic Shift","setid":"001","cardid":"106","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/106","url":"https://warsaken.cards/001/full/106"},{"id":"001-107","name":"Overtime Production","setid":"001","cardid":"107","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/107","url":"https://warsaken.cards/001/full/107"},{"id":"001-108","name":"Push Through","setid":"001","cardid":"108","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/108","url":"https://warsaken.cards/001/full/108"},{"id":"001-109","name":"Non-Agression Treaty","setid":"001","cardid":"109","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/109","url":"https://warsaken.cards/001/full/109"},{"id":"001-110","name":"Mutual Disarmament","setid":"001","cardid":"110","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/110","url":"https://warsaken.cards/001/full/110"},{"id":"001-111","name":"Final Devotion","setid":"001","cardid":"111","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/111","url":"https://warsaken.cards/001/full/111"},{"id":"001-112","name":"Extended Assembly Hours","setid":"001","cardid":"112","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/112","url":"https://warsaken.cards/001/full/112"},{"id":"001-113","name":"Political Speech","setid":"001","cardid":"113","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/113","url":"https://warsaken.cards/001/full/113"},{"id":"001-114","name":"Propaganda","setid":"001","cardid":"114","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/114","url":"https://warsaken.cards/001/full/114"},{"id":"001-115","name":"Inspire the Troops","setid":"001","cardid":"115","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/115","url":"https://warsaken.cards/001/full/115"},{"id":"001-116","name":"Naval Blockade","setid":"001","cardid":"116","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/116","url":"https://warsaken.cards/001/full/116"},{"id":"001-117","name":"Visit from Our Leader","setid":"001","cardid":"117","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/117","url":"https://warsaken.cards/001/full/117"},{"id":"001-118","name":"Blackmail","setid":"001","cardid":"118","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/118","url":"https://warsaken.cards/001/full/118"},{"id":"001-119","name":"Tsunami","setid":"001","cardid":"119","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/119","url":"https://warsaken.cards/001/full/119"},{"id":"001-120","name":"Violent Tornado","setid":"001","cardid":"120","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/120","url":"https://warsaken.cards/001/full/120"},{"id":"001-121","name":"Lasting Blizzard","setid":"001","cardid":"121","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/121","url":"https://warsaken.cards/001/full/121"},{"id":"001-122","name":"Freezing Rainstorm","setid":"001","cardid":"122","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/122","url":"https://warsaken.cards/001/full/122"},{"id":"001-123","name":"Terrifying Storm","setid":"001","cardid":"123","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/123","url":"https://warsaken.cards/001/full/123"},{"id":"001-124","name":"Fire in the Fields","setid":"001","cardid":"124","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/124","url":"https://warsaken.cards/001/full/124"},{"id":"001-125","name":"Guard Tower","setid":"001","cardid":"125","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/125","url":"https://warsaken.cards/001/full/125"},{"id":"001-126","name":"Surface-to-Air Missile Site","setid":"001","cardid":"126","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/126","url":"https://warsaken.cards/001/full/126"},{"id":"001-127","name":"Laser Air Defense Station","setid":"001","cardid":"127","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/127","url":"https://warsaken.cards/001/full/127"},{"id":"001-128","name":"Interrogation Facility","setid":"001","cardid":"128","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/128","url":"https://warsaken.cards/001/full/128"},{"id":"001-129","name":"Shadow Torture Facility","setid":"001","cardid":"129","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/129","url":"https://warsaken.cards/001/full/129"},{"id":"001-130","name":"Military Headquarters","setid":"001","cardid":"130","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/130","url":"https://warsaken.cards/001/full/130"},{"id":"001-131","name":"Advanced Detection Facility","setid":"001","cardid":"131","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/131","url":"https://warsaken.cards/001/full/131"},{"id":"001-132","name":"Soldier Barracks","setid":"001","cardid":"132","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/132","url":"https://warsaken.cards/001/full/132"},{"id":"001-133","name":"Fortified Greenhouse","setid":"001","cardid":"133","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/133","url":"https://warsaken.cards/001/full/133"},{"id":"001-134","name":"Intelligence Command","setid":"001","cardid":"134","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/134","url":"https://warsaken.cards/001/full/134"},{"id":"001-135","name":"Colossal Warehouse","setid":"001","cardid":"135","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/135","url":"https://warsaken.cards/001/full/135"},{"id":"001-136","name":"G-Titan Missile Silo","setid":"001","cardid":"136","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/136","url":"https://warsaken.cards/001/full/136"},{"id":"001-137","name":"Hyper Defense Barrier","setid":"001","cardid":"137","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/137","url":"https://warsaken.cards/001/full/137"},{"id":"001-138","name":"Advanced Weather Station","setid":"001","cardid":"138","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/138","url":"https://warsaken.cards/001/full/138"},{"id":"001-139","name":"Minefield","setid":"001","cardid":"139","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/139","url":"https://warsaken.cards/001/full/139"},{"id":"001-140","name":"Underwater Mines","setid":"001","cardid":"140","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/140","url":"https://warsaken.cards/001/full/140"},{"id":"001-141","name":"Triggered Meltdown","setid":"001","cardid":"141","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/141","url":"https://warsaken.cards/001/full/141"},{"id":"001-142","name":"Instigated Riots","setid":"001","cardid":"142","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/142","url":"https://warsaken.cards/001/full/142"},{"id":"001-143","name":"Caused Production Strike","setid":"001","cardid":"143","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/143","url":"https://warsaken.cards/001/full/143"},{"id":"001-144","name":"Control the Message","setid":"001","cardid":"144","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/144","url":"https://warsaken.cards/001/full/144"},{"id":"001-145","name":"Relentless Raid","setid":"001","cardid":"145","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/145","url":"https://warsaken.cards/001/full/145"},{"id":"001-146","name":"Public Embarrassment","setid":"001","cardid":"146","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/146","url":"https://warsaken.cards/001/full/146"},{"id":"001-147","name":"Mt. Erie Gas Deposits","setid":"001","cardid":"147","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/147","url":"https://warsaken.cards/001/full/147"},{"id":"001-148","name":"City-Engine Fortress","setid":"001","cardid":"148","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/148","url":"https://warsaken.cards/001/full/148"},{"id":"001-149","name":"Stolen Superweapon","setid":"001","cardid":"149","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/149","url":"https://warsaken.cards/001/full/149"},{"id":"001-150","name":"Instilling Fear","setid":"001","cardid":"150","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/001/full/150","url":"https://warsaken.cards/001/full/150"},{"id":"001-151","name":"The Kraken","setid":"001","cardid":"151","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/151","url":"https://warsaken.cards/001/full/151"},{"id":"001-152","name":"The Black Wave","setid":"001","cardid":"152","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/152","url":"https://warsaken.cards/001/full/152"},{"id":"001-153","name":"ST-22 Tanker","setid":"001","cardid":"153","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/153","url":"https://warsaken.cards/001/full/153"},{"id":"001-154","name":"Sergeant Garbo Macada","setid":"001","cardid":"154","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/154","url":"https://warsaken.cards/001/full/154"},{"id":"001-155","name":"RX Salamander","setid":"001","cardid":"155","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/155","url":"https://warsaken.cards/001/full/155"},{"id":"001-156","name":"TX6","setid":"001","cardid":"156","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/156","url":"https://warsaken.cards/001/full/156"},{"id":"001-157","name":"Hoard of Resources","setid":"001","cardid":"157","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/157","url":"https://warsaken.cards/001/full/157"},{"id":"001-158","name":"The Exile's Trap","setid":"001","cardid":"158","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/158","url":"https://warsaken.cards/001/full/158"},{"id":"001-159","name":"Roman's Prototype","setid":"001","cardid":"159","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/159","url":"https://warsaken.cards/001/full/159"},{"id":"001-160","name":"Resource Silo","setid":"001","cardid":"160","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/160","url":"https://warsaken.cards/001/full/160"},{"id":"001-161","name":"Stolen Blueprints","setid":"001","cardid":"161","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/161","url":"https://warsaken.cards/001/full/161"},{"id":"001-162","name":"Secret Mission","setid":"001","cardid":"162","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/162","url":"https://warsaken.cards/001/full/162"},{"id":"001-163","name":"Equipment Recall","setid":"001","cardid":"163","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/163","url":"https://warsaken.cards/001/full/163"},{"id":"001-164","name":"Underground Base","setid":"001","cardid":"164","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/164","url":"https://warsaken.cards/001/full/164"},{"id":"001-165","name":"Vast Hinterland","setid":"001","cardid":"165","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/165","url":"https://warsaken.cards/001/full/165"},{"id":"001-166","name":"Ocean Oil Platforms","setid":"001","cardid":"166","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/166","url":"https://warsaken.cards/001/full/166"},{"id":"001-167","name":"Rummage","setid":"001","cardid":"167","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/167","url":"https://warsaken.cards/001/full/167"},{"id":"001-168","name":"Secure Port","setid":"001","cardid":"168","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/168","url":"https://warsaken.cards/001/full/168"},{"id":"001-169","name":"Hyru Kin, Master Ninja","setid":"001","cardid":"169","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/169","url":"https://warsaken.cards/001/full/169"},{"id":"001-170","name":"Clan Temple","setid":"001","cardid":"170","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/170","url":"https://warsaken.cards/001/full/170"},{"id":"001-171","name":"Kiyoshi Nobu, the Devoted","setid":"001","cardid":"171","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/171","url":"https://warsaken.cards/001/full/171"},{"id":"001-172","name":"Akane Rin","setid":"001","cardid":"172","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/172","url":"https://warsaken.cards/001/full/172"},{"id":"001-173","name":"Gardens of Lee","setid":"001","cardid":"173","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/173","url":"https://warsaken.cards/001/full/173"},{"id":"001-174","name":"Ichiro Daisuke, the Silent","setid":"001","cardid":"174","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/174","url":"https://warsaken.cards/001/full/174"},{"id":"001-175","name":"Ruins of the Brotherland","setid":"001","cardid":"175","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/175","url":"https://warsaken.cards/001/full/175"},{"id":"001-176","name":"Re-Education","setid":"001","cardid":"176","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/176","url":"https://warsaken.cards/001/full/176"},{"id":"001-177","name":"Synthetic Flux Stations","setid":"001","cardid":"177","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/177","url":"https://warsaken.cards/001/full/177"},{"id":"001-178","name":"Jin Nori, Teacher of Stealth","setid":"001","cardid":"178","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/178","url":"https://warsaken.cards/001/full/178"},{"id":"001-179","name":"Dispatched Agent","setid":"001","cardid":"179","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/179","url":"https://warsaken.cards/001/full/179"},{"id":"001-180","name":"Ideal Conditions","setid":"001","cardid":"180","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/180","url":"https://warsaken.cards/001/full/180"},{"id":"001-181","name":"Kai Katsu, Tutor of Fasting","setid":"001","cardid":"181","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/181","url":"https://warsaken.cards/001/full/181"},{"id":"001-182","name":"Jax Nash, the Courier","setid":"001","cardid":"182","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/182","url":"https://warsaken.cards/001/full/182"},{"id":"001-183","name":"Ken Sho, Prime Regent","setid":"001","cardid":"183","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/183","url":"https://warsaken.cards/001/full/183"},{"id":"001-184","name":"Delphine Bay","setid":"001","cardid":"184","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/184","url":"https://warsaken.cards/001/full/184"},{"id":"001-185","name":"A9 Hammerhead","setid":"001","cardid":"185","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/185","url":"https://warsaken.cards/001/full/185"},{"id":"001-186","name":"A7 Axe","setid":"001","cardid":"186","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/186","url":"https://warsaken.cards/001/full/186"},{"id":"001-187","name":"Blinding Sandstorm","setid":"001","cardid":"187","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/187","url":"https://warsaken.cards/001/full/187"},{"id":"001-188","name":"C-5 Barracuda","setid":"001","cardid":"188","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/188","url":"https://warsaken.cards/001/full/188"},{"id":"001-189","name":"Ravager II","setid":"001","cardid":"189","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/189","url":"https://warsaken.cards/001/full/189"},{"id":"001-190","name":"Amplified Uplink Facility","setid":"001","cardid":"190","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/190","url":"https://warsaken.cards/001/full/190"},{"id":"001-191","name":"Jackal Air Base","setid":"001","cardid":"191","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/191","url":"https://warsaken.cards/001/full/191"},{"id":"001-192","name":"TXR, Aerial Refueler","setid":"001","cardid":"192","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/192","url":"https://warsaken.cards/001/full/192"},{"id":"001-193","name":"D7X Detection Disrupter","setid":"001","cardid":"193","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/193","url":"https://warsaken.cards/001/full/193"},{"id":"001-194","name":"X32 Zero","setid":"001","cardid":"194","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/194","url":"https://warsaken.cards/001/full/194"},{"id":"001-195","name":"L1 Needle","setid":"001","cardid":"195","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/195","url":"https://warsaken.cards/001/full/195"},{"id":"001-196","name":"X32 Hive","setid":"001","cardid":"196","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/196","url":"https://warsaken.cards/001/full/196"},{"id":"001-197","name":"F92 Phoenix Reaper","setid":"001","cardid":"197","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/197","url":"https://warsaken.cards/001/full/197"},{"id":"001-198","name":"White Phosphorus Bomb","setid":"001","cardid":"198","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/001/full/198","url":"https://warsaken.cards/001/full/198"},{"id":"001-199","name":"Cloud Cover","setid":"001","cardid":"199","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/001/full/199","url":"https://warsaken.cards/001/full/199"},{"id":"001-200","name":"E-5 Botfly","setid":"001","cardid":"200","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/200","url":"https://warsaken.cards/001/full/200"},{"id":"001-201","name":"Commander Wilfred Louis","setid":"001","cardid":"201","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/201","url":"https://warsaken.cards/001/full/201"},{"id":"001-202","name":"Victor, the Anonymous","setid":"001","cardid":"202","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/202","url":"https://warsaken.cards/001/full/202"},{"id":"001-203","name":"Governor Key","setid":"001","cardid":"203","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/203","url":"https://warsaken.cards/001/full/203"},{"id":"001-204","name":"Admiral Bancroft","setid":"001","cardid":"204","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/204","url":"https://warsaken.cards/001/full/204"},{"id":"001-205","name":"Riku Ito, Ace","setid":"001","cardid":"205","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/001/full/205","url":"https://warsaken.cards/001/full/205"},{"id":"001-206","name":"Brainwash","setid":"001","cardid":"206","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/206","url":"https://warsaken.cards/001/full/206"},{"id":"001-207","name":"Lorenzo Space Center","setid":"001","cardid":"207","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/207","url":"https://warsaken.cards/001/full/207"},{"id":"001-208","name":"Abdul Hafiz, the Supplier","setid":"001","cardid":"208","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/208","url":"https://warsaken.cards/001/full/208"},{"id":"001-209","name":"Sniper Xander Hawkins","setid":"001","cardid":"209","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/209","url":"https://warsaken.cards/001/full/209"},{"id":"001-210","name":"RX Bobcat","setid":"001","cardid":"210","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/210","url":"https://warsaken.cards/001/full/210"},{"id":"001-211","name":"77X Prototype","setid":"001","cardid":"211","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/211","url":"https://warsaken.cards/001/full/211"},{"id":"001-212","name":"Beam Tank 47-1","setid":"001","cardid":"212","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/212","url":"https://warsaken.cards/001/full/212"},{"id":"001-213","name":"Sanctuary","setid":"001","cardid":"213","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/213","url":"https://warsaken.cards/001/full/213"},{"id":"001-214","name":"T99 Lion Heavy Tank","setid":"001","cardid":"214","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/214","url":"https://warsaken.cards/001/full/214"},{"id":"001-215","name":"G1 Fox Buster","setid":"001","cardid":"215","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/215","url":"https://warsaken.cards/001/full/215"},{"id":"001-216","name":"GR Zero Edge","setid":"001","cardid":"216","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/216","url":"https://warsaken.cards/001/full/216"},{"id":"001-217","name":"A2 Nemesis","setid":"001","cardid":"217","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/217","url":"https://warsaken.cards/001/full/217"},{"id":"001-218","name":"OMEGA-32 Mech","setid":"001","cardid":"218","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/218","url":"https://warsaken.cards/001/full/218"},{"id":"001-219","name":"Darson City","setid":"001","cardid":"219","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/219","url":"https://warsaken.cards/001/full/219"},{"id":"001-220","name":"B-25 Zeus Transport","setid":"001","cardid":"220","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/220","url":"https://warsaken.cards/001/full/220"},{"id":"001-221","name":"Y-3 Leo","setid":"001","cardid":"221","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/221","url":"https://warsaken.cards/001/full/221"},{"id":"001-222","name":"Gemini GX","setid":"001","cardid":"222","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/222","url":"https://warsaken.cards/001/full/222"},{"id":"001-223","name":"Dreadnought Six","setid":"001","cardid":"223","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/223","url":"https://warsaken.cards/001/full/223"},{"id":"001-224","name":"Triton-1 Ironside","setid":"001","cardid":"224","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/224","url":"https://warsaken.cards/001/full/224"},{"id":"001-225","name":"Boxton Coal Plants","setid":"001","cardid":"225","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/225","url":"https://warsaken.cards/001/full/225"},{"id":"001-226","name":"Raxius Geothermal Zone","setid":"001","cardid":"226","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/226","url":"https://warsaken.cards/001/full/226"},{"id":"001-227","name":"Spoils of War","setid":"001","cardid":"227","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/227","url":"https://warsaken.cards/001/full/227"},{"id":"001-228","name":"Barrels of Crude","setid":"001","cardid":"228","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/228","url":"https://warsaken.cards/001/full/228"},{"id":"001-229","name":"Vernance Supply Factories","setid":"001","cardid":"229","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/229","url":"https://warsaken.cards/001/full/229"},{"id":"001-230","name":"Seized Depots","setid":"001","cardid":"230","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/230","url":"https://warsaken.cards/001/full/230"},{"id":"001-231","name":"Bancaire Island","setid":"001","cardid":"231","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/231","url":"https://warsaken.cards/001/full/231"},{"id":"001-232","name":"Borblue Natural Gas Site","setid":"001","cardid":"232","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/232","url":"https://warsaken.cards/001/full/232"},{"id":"001-233","name":"Glazov Nuclear Facilities","setid":"001","cardid":"233","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/233","url":"https://warsaken.cards/001/full/233"},{"id":"001-234","name":"Port of Carmasani","setid":"001","cardid":"234","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/234","url":"https://warsaken.cards/001/full/234"},{"id":"001-235","name":"Secret Naval Region","setid":"001","cardid":"235","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/235","url":"https://warsaken.cards/001/full/235"},{"id":"001-236","name":"Lakeland Oil Grounds","setid":"001","cardid":"236","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/236","url":"https://warsaken.cards/001/full/236"},{"id":"001-237","name":"Fusion Power Centers","setid":"001","cardid":"237","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/001/full/237","url":"https://warsaken.cards/001/full/237"},{"id":"001-238","name":"Renzo, the Boss","setid":"001","cardid":"238","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/238","url":"https://warsaken.cards/001/full/238"},{"id":"001-239","name":"Max Harper, Dealer","setid":"001","cardid":"239","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/239","url":"https://warsaken.cards/001/full/239"},{"id":"001-240","name":"00 Black Blade","setid":"001","cardid":"240","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/240","url":"https://warsaken.cards/001/full/240"},{"id":"001-241","name":"Burn Notice","setid":"001","cardid":"241","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/001/full/241","url":"https://warsaken.cards/001/full/241"},{"id":"001-242","name":"Garrisoned Structure","setid":"001","cardid":"242","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/001/full/242","url":"https://warsaken.cards/001/full/242"},{"id":"001-243","name":"Selfless Hero","setid":"001","cardid":"243","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/001/full/243","url":"https://warsaken.cards/001/full/243"},{"id":"001-300","name":"Volkov","setid":"001","cardid":"300","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/300","url":"https://warsaken.cards/001/foil/300"},{"id":"001-301","name":"Lockwood","setid":"001","cardid":"301","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/301","url":"https://warsaken.cards/001/foil/301"},{"id":"001-302","name":"Valorin","setid":"001","cardid":"302","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/302","url":"https://warsaken.cards/001/foil/302"},{"id":"001-303","name":"Lion\u00e9","setid":"001","cardid":"303","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/303","url":"https://warsaken.cards/001/foil/303"},{"id":"001-304","name":"Zeana","setid":"001","cardid":"304","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/304","url":"https://warsaken.cards/001/foil/304"},{"id":"001-305","name":"Lathabo","setid":"001","cardid":"305","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/305","url":"https://warsaken.cards/001/foil/305"},{"id":"001-306","name":"Zoff","setid":"001","cardid":"306","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/306","url":"https://warsaken.cards/001/foil/306"},{"id":"001-307","name":"Awati","setid":"001","cardid":"307","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/307","url":"https://warsaken.cards/001/foil/307"},{"id":"001-308","name":"Emperor","setid":"001","cardid":"308","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/308","url":"https://warsaken.cards/001/foil/308"},{"id":"001-309","name":"Will","setid":"001","cardid":"309","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/309","url":"https://warsaken.cards/001/foil/309"},{"id":"001-310","name":"Victor ","setid":"001","cardid":"310","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/310","url":"https://warsaken.cards/001/foil/310"},{"id":"001-311","name":"Key","setid":"001","cardid":"311","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/311","url":"https://warsaken.cards/001/foil/311"},{"id":"001-312","name":"Bancroft","setid":"001","cardid":"312","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/312","url":"https://warsaken.cards/001/foil/312"},{"id":"001-313","name":"Ace","setid":"001","cardid":"313","type":"Leader","rarity":"Super Rare","img":"https://wrskn.io/001/foil/313","url":"https://warsaken.cards/001/foil/313"},{"id":"001-400","name":"Authentic Volkov","setid":"001","cardid":"400","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/400","url":"https://warsaken.cards/001/gold/400"},{"id":"001-401","name":"Authentic Lockwood","setid":"001","cardid":"401","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/401","url":"https://warsaken.cards/001/gold/401"},{"id":"001-402","name":"Authentic Valorin","setid":"001","cardid":"402","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/402","url":"https://warsaken.cards/001/gold/402"},{"id":"001-403","name":"Authentic Lion\u00e9","setid":"001","cardid":"403","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/403","url":"https://warsaken.cards/001/gold/403"},{"id":"001-404","name":"Authentic Zeana","setid":"001","cardid":"404","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/404","url":"https://warsaken.cards/001/gold/404"},{"id":"001-405","name":"Authentic Lathabo","setid":"001","cardid":"405","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/405","url":"https://warsaken.cards/001/gold/405"},{"id":"001-406","name":"Authentic Zoff","setid":"001","cardid":"406","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/406","url":"https://warsaken.cards/001/gold/406"},{"id":"001-407","name":"Authentic Awati","setid":"001","cardid":"407","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/407","url":"https://warsaken.cards/001/gold/407"},{"id":"001-408","name":"Authentic Emperor","setid":"001","cardid":"408","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/408","url":"https://warsaken.cards/001/gold/408"},{"id":"001-409","name":"Authentic Will","setid":"001","cardid":"409","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/409","url":"https://warsaken.cards/001/gold/409"},{"id":"001-410","name":"Authentic Victor","setid":"001","cardid":"410","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/410","url":"https://warsaken.cards/001/gold/410"},{"id":"001-411","name":"Authentic Key","setid":"001","cardid":"411","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/411","url":"https://warsaken.cards/001/gold/411"},{"id":"001-412","name":"Authentic Bancroft","setid":"001","cardid":"412","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/412","url":"https://warsaken.cards/001/gold/412"},{"id":"001-413","name":"Authentic Ace","setid":"001","cardid":"413","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/001/gold/413","url":"https://warsaken.cards/001/gold/413"},{"id":"001-414","name":"Tyrant Volkov","setid":"001","cardid":"414","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/414","url":"https://warsaken.cards/001/blood/414"},{"id":"001-415","name":"Tyrant Lockwood","setid":"001","cardid":"415","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/415","url":"https://warsaken.cards/001/blood/415"},{"id":"001-416","name":"Tyrant Valorin","setid":"001","cardid":"416","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/416","url":"https://warsaken.cards/001/blood/416"},{"id":"001-417","name":"Tyrant Lion\u00e9","setid":"001","cardid":"417","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/417","url":"https://warsaken.cards/001/blood/417"},{"id":"001-418","name":"Tyrant Zeana","setid":"001","cardid":"418","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/418","url":"https://warsaken.cards/001/blood/418"},{"id":"001-419","name":"Tyrant Lathabo","setid":"001","cardid":"419","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/419","url":"https://warsaken.cards/001/blood/419"},{"id":"001-420","name":"Tyrant Zoff","setid":"001","cardid":"420","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/420","url":"https://warsaken.cards/001/blood/420"},{"id":"001-421","name":"Tyrant Awati","setid":"001","cardid":"421","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/421","url":"https://warsaken.cards/001/blood/421"},{"id":"001-422","name":"Tyrant Emperor","setid":"001","cardid":"422","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/422","url":"https://warsaken.cards/001/blood/422"},{"id":"001-423","name":"Tyrant Will","setid":"001","cardid":"423","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/423","url":"https://warsaken.cards/001/blood/423"},{"id":"001-424","name":"Tyrant Victor","setid":"001","cardid":"424","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/424","url":"https://warsaken.cards/001/blood/424"},{"id":"001-425","name":"Tyrant Key","setid":"001","cardid":"425","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/425","url":"https://warsaken.cards/001/blood/425"},{"id":"001-426","name":"Tyrant Bancroft","setid":"001","cardid":"426","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/426","url":"https://warsaken.cards/001/blood/426"},{"id":"001-427","name":"Tyrant Ace","setid":"001","cardid":"427","type":"Leader","rarity":"One of One","img":"https://wrskn.io/001/blood/427","url":"https://warsaken.cards/001/blood/427"},{"id":"001-500","name":"APEX-55 Mech","setid":"001","cardid":"500","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/500","url":"https://warsaken.cards/001/foil/500"},{"id":"001-501","name":"Goliath 65","setid":"001","cardid":"501","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/501","url":"https://warsaken.cards/001/foil/501"},{"id":"001-502","name":"A4 Revenge Super Carrier","setid":"001","cardid":"502","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/502","url":"https://warsaken.cards/001/foil/502"},{"id":"001-503","name":"The Kraken","setid":"001","cardid":"503","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/503","url":"https://warsaken.cards/001/foil/503"},{"id":"001-504","name":"Roman's Prototype","setid":"001","cardid":"504","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/504","url":"https://warsaken.cards/001/foil/504"},{"id":"001-505","name":"Ravager II","setid":"001","cardid":"505","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/505","url":"https://warsaken.cards/001/foil/505"},{"id":"001-506","name":"X32 Hive","setid":"001","cardid":"506","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/506","url":"https://warsaken.cards/001/foil/506"},{"id":"001-507","name":"F92 Phoenix Reaper","setid":"001","cardid":"507","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/507","url":"https://warsaken.cards/001/foil/507"},{"id":"001-508","name":"77X Prototype","setid":"001","cardid":"508","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/508","url":"https://warsaken.cards/001/foil/508"},{"id":"001-509","name":"Gemini GX","setid":"001","cardid":"509","type":"G Force","rarity":"Super Rare","img":"https://wrskn.io/001/foil/509","url":"https://warsaken.cards/001/foil/509"},{"id":"001-600","name":"Wolf Power District","setid":"001","cardid":"600","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/600","url":"https://warsaken.cards/001/owner/600"},{"id":"001-601","name":"Pons Research Centers","setid":"001","cardid":"601","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/601","url":"https://warsaken.cards/001/owner/601"},{"id":"001-602","name":"Biofuel Research Farms","setid":"001","cardid":"602","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/602","url":"https://warsaken.cards/001/owner/602"},{"id":"001-603","name":"Mt. Uptania Production Site","setid":"001","cardid":"603","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/603","url":"https://warsaken.cards/001/owner/603"},{"id":"001-604","name":"Golden Farmlands","setid":"001","cardid":"604","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/604","url":"https://warsaken.cards/001/owner/604"},{"id":"001-605","name":"Dryton Oil Fields","setid":"001","cardid":"605","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/605","url":"https://warsaken.cards/001/owner/605"},{"id":"001-606","name":"Fermi Energy Plants","setid":"001","cardid":"606","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/606","url":"https://warsaken.cards/001/owner/606"},{"id":"001-607","name":"St. Purcell Harbor","setid":"001","cardid":"607","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/607","url":"https://warsaken.cards/001/owner/607"},{"id":"001-608","name":"Mt. Pom\u00e9 Orchards","setid":"001","cardid":"608","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/608","url":"https://warsaken.cards/001/owner/608"},{"id":"001-609","name":"Mt. Erie Gas Deposits","setid":"001","cardid":"609","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/609","url":"https://warsaken.cards/001/owner/609"},{"id":"001-610","name":"City-Engine Fortress","setid":"001","cardid":"610","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/610","url":"https://warsaken.cards/001/owner/610"},{"id":"001-611","name":"Hoard of Resources","setid":"001","cardid":"611","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/611","url":"https://warsaken.cards/001/owner/611"},{"id":"001-612","name":"The Exile's Trap","setid":"001","cardid":"612","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/612","url":"https://warsaken.cards/001/owner/612"},{"id":"001-613","name":"Underground Base","setid":"001","cardid":"613","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/613","url":"https://warsaken.cards/001/owner/613"},{"id":"001-614","name":"Vast Hinterland","setid":"001","cardid":"614","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/614","url":"https://warsaken.cards/001/owner/614"},{"id":"001-615","name":"Ocean Oil Platforms","setid":"001","cardid":"615","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/615","url":"https://warsaken.cards/001/owner/615"},{"id":"001-616","name":"Gardens of Lee","setid":"001","cardid":"616","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/616","url":"https://warsaken.cards/001/owner/616"},{"id":"001-617","name":"Ruins of the Brotherland","setid":"001","cardid":"617","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/617","url":"https://warsaken.cards/001/owner/617"},{"id":"001-618","name":"Synthetic Flux Stations","setid":"001","cardid":"618","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/618","url":"https://warsaken.cards/001/owner/618"},{"id":"001-619","name":"Delphine Bay","setid":"001","cardid":"619","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/619","url":"https://warsaken.cards/001/owner/619"},{"id":"001-620","name":"Sanctuary","setid":"001","cardid":"620","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/620","url":"https://warsaken.cards/001/owner/620"},{"id":"001-621","name":"Darson City","setid":"001","cardid":"621","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/621","url":"https://warsaken.cards/001/owner/621"},{"id":"001-622","name":"Boxton Coal Plants","setid":"001","cardid":"622","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/622","url":"https://warsaken.cards/001/owner/622"},{"id":"001-623","name":"Raxius Geothermal Zone","setid":"001","cardid":"623","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/623","url":"https://warsaken.cards/001/owner/623"},{"id":"001-624","name":"Spoils of War","setid":"001","cardid":"624","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/624","url":"https://warsaken.cards/001/owner/624"},{"id":"001-625","name":"Barrels of Crude","setid":"001","cardid":"625","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/625","url":"https://warsaken.cards/001/owner/625"},{"id":"001-626","name":"Vernance Supply Factories","setid":"001","cardid":"626","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/626","url":"https://warsaken.cards/001/owner/626"},{"id":"001-627","name":"Seized Depots","setid":"001","cardid":"627","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/627","url":"https://warsaken.cards/001/owner/627"},{"id":"001-628","name":"Bancaire Island","setid":"001","cardid":"628","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/628","url":"https://warsaken.cards/001/owner/628"},{"id":"001-629","name":"Borblue Natural Gas Site","setid":"001","cardid":"629","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/629","url":"https://warsaken.cards/001/owner/629"},{"id":"001-630","name":"Glazov Nuclear Facilities","setid":"001","cardid":"630","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/630","url":"https://warsaken.cards/001/owner/630"},{"id":"001-631","name":"Port of Carmasani","setid":"001","cardid":"631","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/631","url":"https://warsaken.cards/001/owner/631"},{"id":"001-632","name":"Secret Naval Region","setid":"001","cardid":"632","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/632","url":"https://warsaken.cards/001/owner/632"},{"id":"001-633","name":"Lakeland Oil Grounds","setid":"001","cardid":"633","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/633","url":"https://warsaken.cards/001/owner/633"},{"id":"001-634","name":"Fusion Power Centers","setid":"001","cardid":"634","type":"Territory","rarity":"One of One","img":"https://wrskn.io/001/owner/634","url":"https://warsaken.cards/001/owner/634"},{"id":"001-900","name":"Generic Resource","setid":"001","cardid":"900","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/001/full/900","url":"https://warsaken.cards/001/full/900"},{"id":"001-901","name":"Food Resource","setid":"001","cardid":"901","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/001/full/901","url":"https://warsaken.cards/001/full/901"},{"id":"001-902","name":"Power Resource","setid":"001","cardid":"902","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/001/full/902","url":"https://warsaken.cards/001/full/902"},{"id":"001-903","name":"Fuel Resource","setid":"001","cardid":"903","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/001/full/903","url":"https://warsaken.cards/001/full/903"},{"id":"001-904","name":"Equipment Resource","setid":"001","cardid":"904","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/001/full/904","url":"https://warsaken.cards/001/full/904"},{"id":"001-999","name":"First Wave Upgrade","setid":"001","cardid":"999","type":"Upgrade","rarity":"Common","img":"https://wrskn.io/001/up/999","url":"https://warsaken.cards/001/up/999"},{"id":"002-000","name":"Victor, the Underworld","setid":"002","cardid":"000","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/000","url":"https://warsaken.cards/002/full/000"},{"id":"002-001","name":"Lord Ziegler","setid":"002","cardid":"001","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/001","url":"https://warsaken.cards/002/full/001"},{"id":"002-002","name":"Major De la Croix","setid":"002","cardid":"002","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/002","url":"https://warsaken.cards/002/full/002"},{"id":"002-003","name":"Minister Akamu","setid":"002","cardid":"003","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/003","url":"https://warsaken.cards/002/full/003"},{"id":"002-004","name":"Czar Vedant Bakshi","setid":"002","cardid":"004","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/004","url":"https://warsaken.cards/002/full/004"},{"id":"002-005","name":"Sawyer, the Resurgent","setid":"002","cardid":"005","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/005","url":"https://warsaken.cards/002/full/005"},{"id":"002-006","name":"Lady Auren Dias","setid":"002","cardid":"006","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/006","url":"https://warsaken.cards/002/full/006"},{"id":"002-007","name":"Ryker, Nuclear Overlord","setid":"002","cardid":"007","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/007","url":"https://warsaken.cards/002/full/007"},{"id":"002-008","name":"High Justice Bancroft","setid":"002","cardid":"008","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/008","url":"https://warsaken.cards/002/full/008"},{"id":"002-009","name":"General J. Holt","setid":"002","cardid":"009","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/009","url":"https://warsaken.cards/002/full/009"},{"id":"002-010","name":"Kyodo Lee, Ronin","setid":"002","cardid":"010","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/010","url":"https://warsaken.cards/002/full/010"},{"id":"002-011","name":"Viceroy Demidov","setid":"002","cardid":"011","type":"Leader","rarity":"Uncommon","img":"https://wrskn.io/002/full/011","url":"https://warsaken.cards/002/full/011"},{"id":"002-012","name":"VL II Energy Center","setid":"002","cardid":"012","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/012","url":"https://warsaken.cards/002/full/012"},{"id":"002-013","name":"Ironhead Enclave","setid":"002","cardid":"013","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/013","url":"https://warsaken.cards/002/full/013"},{"id":"002-014","name":"North Oakworth","setid":"002","cardid":"014","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/014","url":"https://warsaken.cards/002/full/014"},{"id":"002-015","name":"Solarin Grove","setid":"002","cardid":"015","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/015","url":"https://warsaken.cards/002/full/015"},{"id":"002-016","name":"Blackearth Mine","setid":"002","cardid":"016","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/016","url":"https://warsaken.cards/002/full/016"},{"id":"002-017","name":"Moreau Swamp","setid":"002","cardid":"017","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/017","url":"https://warsaken.cards/002/full/017"},{"id":"002-018","name":"Scrap Yard S3-1035","setid":"002","cardid":"018","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/018","url":"https://warsaken.cards/002/full/018"},{"id":"002-019","name":"Warehouse Precinct","setid":"002","cardid":"019","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/019","url":"https://warsaken.cards/002/full/019"},{"id":"002-020","name":"Delicate Terraces","setid":"002","cardid":"020","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/020","url":"https://warsaken.cards/002/full/020"},{"id":"002-021","name":"Prela Copper Industries","setid":"002","cardid":"021","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/021","url":"https://warsaken.cards/002/full/021"},{"id":"002-022","name":"Petrochemical Works","setid":"002","cardid":"022","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/022","url":"https://warsaken.cards/002/full/022"},{"id":"002-023","name":"Bio Incineration Facilities","setid":"002","cardid":"023","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/023","url":"https://warsaken.cards/002/full/023"},{"id":"002-024","name":"Zimm Manufacturing","setid":"002","cardid":"024","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/024","url":"https://warsaken.cards/002/full/024"},{"id":"002-025","name":"Hart Natural Gas Center","setid":"002","cardid":"025","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/025","url":"https://warsaken.cards/002/full/025"},{"id":"002-026","name":"Sola Island Markets","setid":"002","cardid":"026","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/026","url":"https://warsaken.cards/002/full/026"},{"id":"002-027","name":"Nation's Capital","setid":"002","cardid":"027","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/027","url":"https://warsaken.cards/002/full/027"},{"id":"002-028","name":"Abandoned Wasteland","setid":"002","cardid":"028","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/028","url":"https://warsaken.cards/002/full/028"},{"id":"002-029","name":"Clementine Mire","setid":"002","cardid":"029","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/029","url":"https://warsaken.cards/002/full/029"},{"id":"002-030","name":"Specialist Sabian Hunter","setid":"002","cardid":"030","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/030","url":"https://warsaken.cards/002/full/030"},{"id":"002-031","name":"Koloa Plantation","setid":"002","cardid":"031","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/031","url":"https://warsaken.cards/002/full/031"},{"id":"002-032","name":"White Rock Energy","setid":"002","cardid":"032","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/032","url":"https://warsaken.cards/002/full/032"},{"id":"002-033","name":"Weapons District","setid":"002","cardid":"033","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/033","url":"https://warsaken.cards/002/full/033"},{"id":"002-034","name":"International Pipelines","setid":"002","cardid":"034","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/034","url":"https://warsaken.cards/002/full/034"},{"id":"002-035","name":"Brotherland Fields","setid":"002","cardid":"035","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/035","url":"https://warsaken.cards/002/full/035"},{"id":"002-036","name":"Aiko Kita, the Swift","setid":"002","cardid":"036","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/036","url":"https://warsaken.cards/002/full/036"},{"id":"002-037","name":"Bella, Trusted Strategist","setid":"002","cardid":"037","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/037","url":"https://warsaken.cards/002/full/037"},{"id":"002-038","name":"Omar Park","setid":"002","cardid":"038","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/038","url":"https://warsaken.cards/002/full/038"},{"id":"002-039","name":"Sylvia Keene","setid":"002","cardid":"039","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/039","url":"https://warsaken.cards/002/full/039"},{"id":"002-040","name":"Agent Ryan Silver","setid":"002","cardid":"040","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/040","url":"https://warsaken.cards/002/full/040"},{"id":"002-041","name":"Sniper Kya Charlize","setid":"002","cardid":"041","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/041","url":"https://warsaken.cards/002/full/041"},{"id":"002-042","name":"Loyalty Officer Kahue","setid":"002","cardid":"042","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/042","url":"https://warsaken.cards/002/full/042"},{"id":"002-043","name":"Master Sergeant Rockwell","setid":"002","cardid":"043","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/043","url":"https://warsaken.cards/002/full/043"},{"id":"002-044","name":"Osip Gryaznov","setid":"002","cardid":"044","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/044","url":"https://warsaken.cards/002/full/044"},{"id":"002-045","name":"Dakota Clark, Guardian","setid":"002","cardid":"045","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/045","url":"https://warsaken.cards/002/full/045"},{"id":"002-046","name":"Outrider","setid":"002","cardid":"046","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/046","url":"https://warsaken.cards/002/full/046"},{"id":"002-047","name":"Coda","setid":"002","cardid":"047","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/047","url":"https://warsaken.cards/002/full/047"},{"id":"002-048","name":"Private Thomas Kasper","setid":"002","cardid":"048","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/048","url":"https://warsaken.cards/002/full/048"},{"id":"002-049","name":"Lead Junker Pegg","setid":"002","cardid":"049","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/049","url":"https://warsaken.cards/002/full/049"},{"id":"002-050","name":"Stone","setid":"002","cardid":"050","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/050","url":"https://warsaken.cards/002/full/050"},{"id":"002-051","name":"Agent Andrej Zima","setid":"002","cardid":"051","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/051","url":"https://warsaken.cards/002/full/051"},{"id":"002-052","name":"Private Steven Riggs","setid":"002","cardid":"052","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/052","url":"https://warsaken.cards/002/full/052"},{"id":"002-053","name":"Rusty","setid":"002","cardid":"053","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/053","url":"https://warsaken.cards/002/full/053"},{"id":"002-054","name":"Sergeant Randwulf Betzer","setid":"002","cardid":"054","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/054","url":"https://warsaken.cards/002/full/054"},{"id":"002-055","name":"Mason Williams, Splicer","setid":"002","cardid":"055","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/055","url":"https://warsaken.cards/002/full/055"},{"id":"002-056","name":"Butcher","setid":"002","cardid":"056","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/056","url":"https://warsaken.cards/002/full/056"},{"id":"002-057","name":"Sergeant Sigwalt Klein","setid":"002","cardid":"057","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/057","url":"https://warsaken.cards/002/full/057"},{"id":"002-058","name":"Private Lucy Verderben","setid":"002","cardid":"058","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/058","url":"https://warsaken.cards/002/full/058"},{"id":"002-059","name":"Levi Vipul, Ex-Supplier","setid":"002","cardid":"059","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/059","url":"https://warsaken.cards/002/full/059"},{"id":"002-060","name":"Gage","setid":"002","cardid":"060","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/060","url":"https://warsaken.cards/002/full/060"},{"id":"002-061","name":"Rayaan, the Insider","setid":"002","cardid":"061","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/061","url":"https://warsaken.cards/002/full/061"},{"id":"002-062","name":"Specialist Keoni Ulani","setid":"002","cardid":"062","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/062","url":"https://warsaken.cards/002/full/062"},{"id":"002-063","name":"Lucas Campbell, Farmer","setid":"002","cardid":"063","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/063","url":"https://warsaken.cards/002/full/063"},{"id":"002-064","name":"Beast","setid":"002","cardid":"064","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/064","url":"https://warsaken.cards/002/full/064"},{"id":"002-065","name":"GR Prowler","setid":"002","cardid":"065","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/065","url":"https://warsaken.cards/002/full/065"},{"id":"002-066","name":"G-16 Mech","setid":"002","cardid":"066","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/066","url":"https://warsaken.cards/002/full/066"},{"id":"002-067","name":"Dimitrovtek-11 Mech","setid":"002","cardid":"067","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/067","url":"https://warsaken.cards/002/full/067"},{"id":"002-068","name":"Goliath 62D","setid":"002","cardid":"068","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/068","url":"https://warsaken.cards/002/full/068"},{"id":"002-069","name":"Dark Bear - 2XP","setid":"002","cardid":"069","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/069","url":"https://warsaken.cards/002/full/069"},{"id":"002-070","name":"R-19 Synth","setid":"002","cardid":"070","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/070","url":"https://warsaken.cards/002/full/070"},{"id":"002-071","name":"X-56 Aftermath","setid":"002","cardid":"071","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/071","url":"https://warsaken.cards/002/full/071"},{"id":"002-072","name":"262-Z Inferno","setid":"002","cardid":"072","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/072","url":"https://warsaken.cards/002/full/072"},{"id":"002-073","name":"Blazer PTK","setid":"002","cardid":"073","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/073","url":"https://warsaken.cards/002/full/073"},{"id":"002-074","name":"Centurion MK7","setid":"002","cardid":"074","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/074","url":"https://warsaken.cards/002/full/074"},{"id":"002-075","name":"M65 Minesweeper","setid":"002","cardid":"075","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/075","url":"https://warsaken.cards/002/full/075"},{"id":"002-076","name":"AG Wolverine","setid":"002","cardid":"076","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/076","url":"https://warsaken.cards/002/full/076"},{"id":"002-077","name":"Lockdown K1","setid":"002","cardid":"077","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/077","url":"https://warsaken.cards/002/full/077"},{"id":"002-078","name":"X3 Black Dog","setid":"002","cardid":"078","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/078","url":"https://warsaken.cards/002/full/078"},{"id":"002-079","name":"Rhino 5","setid":"002","cardid":"079","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/079","url":"https://warsaken.cards/002/full/079"},{"id":"002-080","name":"F-12X","setid":"002","cardid":"080","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/080","url":"https://warsaken.cards/002/full/080"},{"id":"002-081","name":"ALPHA-64 Mech","setid":"002","cardid":"081","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/081","url":"https://warsaken.cards/002/full/081"},{"id":"002-082","name":"R9 Fury","setid":"002","cardid":"082","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/082","url":"https://warsaken.cards/002/full/082"},{"id":"002-083","name":"RCG Charleston","setid":"002","cardid":"083","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/083","url":"https://warsaken.cards/002/full/083"},{"id":"002-084","name":"M565 Fuel Truck","setid":"002","cardid":"084","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/084","url":"https://warsaken.cards/002/full/084"},{"id":"002-085","name":"GR Giga Crawler","setid":"002","cardid":"085","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/085","url":"https://warsaken.cards/002/full/085"},{"id":"002-086","name":"J155 Brutus","setid":"002","cardid":"086","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/086","url":"https://warsaken.cards/002/full/086"},{"id":"002-087","name":"R3 Menace","setid":"002","cardid":"087","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/087","url":"https://warsaken.cards/002/full/087"},{"id":"002-088","name":"XC-S 35","setid":"002","cardid":"088","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/088","url":"https://warsaken.cards/002/full/088"},{"id":"002-089","name":"G-21 Solomon","setid":"002","cardid":"089","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/089","url":"https://warsaken.cards/002/full/089"},{"id":"002-090","name":"Kite C-43","setid":"002","cardid":"090","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/090","url":"https://warsaken.cards/002/full/090"},{"id":"002-091","name":"M8-1","setid":"002","cardid":"091","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/091","url":"https://warsaken.cards/002/full/091"},{"id":"002-092","name":"A96 Knight Hunter","setid":"002","cardid":"092","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/092","url":"https://warsaken.cards/002/full/092"},{"id":"002-093","name":"06 Patrol Chopper","setid":"002","cardid":"093","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/093","url":"https://warsaken.cards/002/full/093"},{"id":"002-094","name":"4FS Red Wolf","setid":"002","cardid":"094","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/094","url":"https://warsaken.cards/002/full/094"},{"id":"002-095","name":"DH Wildcat","setid":"002","cardid":"095","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/095","url":"https://warsaken.cards/002/full/095"},{"id":"002-096","name":"A3H Fire Spear","setid":"002","cardid":"096","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/096","url":"https://warsaken.cards/002/full/096"},{"id":"002-097","name":"RH Mirage","setid":"002","cardid":"097","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/097","url":"https://warsaken.cards/002/full/097"},{"id":"002-098","name":"B5 II","setid":"002","cardid":"098","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/098","url":"https://warsaken.cards/002/full/098"},{"id":"002-099","name":"Shuriken Z84","setid":"002","cardid":"099","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/099","url":"https://warsaken.cards/002/full/099"},{"id":"002-100","name":"Sky Viper V","setid":"002","cardid":"100","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/100","url":"https://warsaken.cards/002/full/100"},{"id":"002-101","name":"GX5 Wind II","setid":"002","cardid":"101","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/101","url":"https://warsaken.cards/002/full/101"},{"id":"002-102","name":"Condor 891X","setid":"002","cardid":"102","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/102","url":"https://warsaken.cards/002/full/102"},{"id":"002-103","name":"Nightingale M5","setid":"002","cardid":"103","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/103","url":"https://warsaken.cards/002/full/103"},{"id":"002-104","name":"HH Screamer","setid":"002","cardid":"104","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/104","url":"https://warsaken.cards/002/full/104"},{"id":"002-105","name":"Demon Shield","setid":"002","cardid":"105","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/105","url":"https://warsaken.cards/002/full/105"},{"id":"002-106","name":"H3-II Striker","setid":"002","cardid":"106","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/106","url":"https://warsaken.cards/002/full/106"},{"id":"002-107","name":"B3 Onzil","setid":"002","cardid":"107","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/107","url":"https://warsaken.cards/002/full/107"},{"id":"002-108","name":"GX-J Eagle II","setid":"002","cardid":"108","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/108","url":"https://warsaken.cards/002/full/108"},{"id":"002-109","name":"55 Corvus","setid":"002","cardid":"109","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/109","url":"https://warsaken.cards/002/full/109"},{"id":"002-110","name":"Quad X5","setid":"002","cardid":"110","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/110","url":"https://warsaken.cards/002/full/110"},{"id":"002-111","name":"T1 Mosquito","setid":"002","cardid":"111","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/111","url":"https://warsaken.cards/002/full/111"},{"id":"002-112","name":"Gray Owl XR","setid":"002","cardid":"112","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/112","url":"https://warsaken.cards/002/full/112"},{"id":"002-113","name":"T-2 Cormorant","setid":"002","cardid":"113","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/113","url":"https://warsaken.cards/002/full/113"},{"id":"002-114","name":"VX Cerberus","setid":"002","cardid":"114","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/114","url":"https://warsaken.cards/002/full/114"},{"id":"002-115","name":"HX Odin","setid":"002","cardid":"115","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/115","url":"https://warsaken.cards/002/full/115"},{"id":"002-116","name":"0X-P Glacier","setid":"002","cardid":"116","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/116","url":"https://warsaken.cards/002/full/116"},{"id":"002-117","name":"Black Raider II","setid":"002","cardid":"117","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/117","url":"https://warsaken.cards/002/full/117"},{"id":"002-118","name":"D1 Fluxcraft","setid":"002","cardid":"118","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/118","url":"https://warsaken.cards/002/full/118"},{"id":"002-119","name":"GR Night Phantom","setid":"002","cardid":"119","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/119","url":"https://warsaken.cards/002/full/119"},{"id":"002-120","name":"EE-L","setid":"002","cardid":"120","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/120","url":"https://warsaken.cards/002/full/120"},{"id":"002-121","name":"Hoffmann LR-4","setid":"002","cardid":"121","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/121","url":"https://warsaken.cards/002/full/121"},{"id":"002-122","name":"D948-x1","setid":"002","cardid":"122","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/122","url":"https://warsaken.cards/002/full/122"},{"id":"002-123","name":"AT-N Bruiser","setid":"002","cardid":"123","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/123","url":"https://warsaken.cards/002/full/123"},{"id":"002-124","name":"OT-15","setid":"002","cardid":"124","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/124","url":"https://warsaken.cards/002/full/124"},{"id":"002-125","name":"T15 Jameson Hauler","setid":"002","cardid":"125","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/125","url":"https://warsaken.cards/002/full/125"},{"id":"002-126","name":"AS34 Wave","setid":"002","cardid":"126","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/126","url":"https://warsaken.cards/002/full/126"},{"id":"002-127","name":"ATS Minnow","setid":"002","cardid":"127","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/127","url":"https://warsaken.cards/002/full/127"},{"id":"002-128","name":"Swamp Shark V","setid":"002","cardid":"128","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/128","url":"https://warsaken.cards/002/full/128"},{"id":"002-129","name":"Tactical Nuke","setid":"002","cardid":"129","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/129","url":"https://warsaken.cards/002/full/129"},{"id":"002-130","name":"Orbital Barrage","setid":"002","cardid":"130","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/130","url":"https://warsaken.cards/002/full/130"},{"id":"002-131","name":"MSK Nerve Agent","setid":"002","cardid":"131","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/131","url":"https://warsaken.cards/002/full/131"},{"id":"002-132","name":"Dirty Bomb","setid":"002","cardid":"132","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/132","url":"https://warsaken.cards/002/full/132"},{"id":"002-133","name":"Hydrosonic Blast","setid":"002","cardid":"133","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/133","url":"https://warsaken.cards/002/full/133"},{"id":"002-134","name":"HLK Neutron Detonation","setid":"002","cardid":"134","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/134","url":"https://warsaken.cards/002/full/134"},{"id":"002-135","name":"Toxic Devastation","setid":"002","cardid":"135","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/135","url":"https://warsaken.cards/002/full/135"},{"id":"002-136","name":"Inescapable Infection","setid":"002","cardid":"136","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/136","url":"https://warsaken.cards/002/full/136"},{"id":"002-137","name":"Chemical Augmentation","setid":"002","cardid":"137","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/137","url":"https://warsaken.cards/002/full/137"},{"id":"002-138","name":"Ion Particle Strike","setid":"002","cardid":"138","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/138","url":"https://warsaken.cards/002/full/138"},{"id":"002-139","name":"M42 Flatback","setid":"002","cardid":"139","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/139","url":"https://warsaken.cards/002/full/139"},{"id":"002-140","name":"Antimatter Bomb","setid":"002","cardid":"140","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/140","url":"https://warsaken.cards/002/full/140"},{"id":"002-141","name":"System Blackout","setid":"002","cardid":"141","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/141","url":"https://warsaken.cards/002/full/141"},{"id":"002-142","name":"ZN Blood Fungus","setid":"002","cardid":"142","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/142","url":"https://warsaken.cards/002/full/142"},{"id":"002-143","name":"Mauz Gas","setid":"002","cardid":"143","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/143","url":"https://warsaken.cards/002/full/143"},{"id":"002-144","name":"Nano Corrosive Attack","setid":"002","cardid":"144","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/144","url":"https://warsaken.cards/002/full/144"},{"id":"002-145","name":"Radioactive Fallout","setid":"002","cardid":"145","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/145","url":"https://warsaken.cards/002/full/145"},{"id":"002-146","name":"Noxious Burst","setid":"002","cardid":"146","type":"WMD","rarity":"Uncommon","img":"https://wrskn.io/002/full/146","url":"https://warsaken.cards/002/full/146"},{"id":"002-147","name":"Agent Margot, Assassin","setid":"002","cardid":"147","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/147","url":"https://warsaken.cards/002/full/147"},{"id":"002-148","name":"The Hawk's Nest","setid":"002","cardid":"148","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/148","url":"https://warsaken.cards/002/full/148"},{"id":"002-149","name":"Denson Factory","setid":"002","cardid":"149","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/149","url":"https://warsaken.cards/002/full/149"},{"id":"002-150","name":"Draft Center","setid":"002","cardid":"150","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/150","url":"https://warsaken.cards/002/full/150"},{"id":"002-151","name":"State Media Building","setid":"002","cardid":"151","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/151","url":"https://warsaken.cards/002/full/151"},{"id":"002-152","name":"Dietrich Genetic Labs","setid":"002","cardid":"152","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/152","url":"https://warsaken.cards/002/full/152"},{"id":"002-153","name":"Medical Release","setid":"002","cardid":"153","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/153","url":"https://warsaken.cards/002/full/153"},{"id":"002-154","name":"Plasma Firewall","setid":"002","cardid":"154","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/154","url":"https://warsaken.cards/002/full/154"},{"id":"002-155","name":"Hydro Crypto Generator","setid":"002","cardid":"155","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/155","url":"https://warsaken.cards/002/full/155"},{"id":"002-156","name":"Cyberwarfare Hub","setid":"002","cardid":"156","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/156","url":"https://warsaken.cards/002/full/156"},{"id":"002-157","name":"Pegasus Missile Silo","setid":"002","cardid":"157","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/157","url":"https://warsaken.cards/002/full/157"},{"id":"002-158","name":"Sawyer's Garage","setid":"002","cardid":"158","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/158","url":"https://warsaken.cards/002/full/158"},{"id":"002-159","name":"Submerged Sub Base","setid":"002","cardid":"159","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/159","url":"https://warsaken.cards/002/full/159"},{"id":"002-160","name":"Thunderbird ICBM","setid":"002","cardid":"160","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/160","url":"https://warsaken.cards/002/full/160"},{"id":"002-161","name":"Ghost Training Facility","setid":"002","cardid":"161","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/161","url":"https://warsaken.cards/002/full/161"},{"id":"002-162","name":"Glasport Radar Facility","setid":"002","cardid":"162","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/162","url":"https://warsaken.cards/002/full/162"},{"id":"002-163","name":"Structural Disruptor","setid":"002","cardid":"163","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/163","url":"https://warsaken.cards/002/full/163"},{"id":"002-164","name":"X1 Mines","setid":"002","cardid":"164","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/164","url":"https://warsaken.cards/002/full/164"},{"id":"002-165","name":"Wave Mines","setid":"002","cardid":"165","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/165","url":"https://warsaken.cards/002/full/165"},{"id":"002-166","name":"Black Market","setid":"002","cardid":"166","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/166","url":"https://warsaken.cards/002/full/166"},{"id":"002-167","name":"205X Prototype","setid":"002","cardid":"167","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/167","url":"https://warsaken.cards/002/full/167"},{"id":"002-168","name":"The Pact Breaker","setid":"002","cardid":"168","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/168","url":"https://warsaken.cards/002/full/168"},{"id":"002-169","name":"XR73 Crocodile","setid":"002","cardid":"169","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/169","url":"https://warsaken.cards/002/full/169"},{"id":"002-170","name":"MK-2 Twin","setid":"002","cardid":"170","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/170","url":"https://warsaken.cards/002/full/170"},{"id":"002-171","name":"Black Nebula III","setid":"002","cardid":"171","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/171","url":"https://warsaken.cards/002/full/171"},{"id":"002-172","name":"VR Aspirant","setid":"002","cardid":"172","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/172","url":"https://warsaken.cards/002/full/172"},{"id":"002-173","name":"Overtax","setid":"002","cardid":"173","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/173","url":"https://warsaken.cards/002/full/173"},{"id":"002-174","name":"Motion of Annexation","setid":"002","cardid":"174","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/174","url":"https://warsaken.cards/002/full/174"},{"id":"002-175","name":"Induced Inflation","setid":"002","cardid":"175","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/175","url":"https://warsaken.cards/002/full/175"},{"id":"002-176","name":"Prebattle Prayer","setid":"002","cardid":"176","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/176","url":"https://warsaken.cards/002/full/176"},{"id":"002-177","name":"All Hands","setid":"002","cardid":"177","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/177","url":"https://warsaken.cards/002/full/177"},{"id":"002-178","name":"Climbing Death Toll","setid":"002","cardid":"178","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/178","url":"https://warsaken.cards/002/full/178"},{"id":"002-179","name":"Ascension to the Mantle","setid":"002","cardid":"179","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/179","url":"https://warsaken.cards/002/full/179"},{"id":"002-180","name":"Nuclear Arms Race","setid":"002","cardid":"180","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/180","url":"https://warsaken.cards/002/full/180"},{"id":"002-181","name":"Ignite the Confidence","setid":"002","cardid":"181","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/181","url":"https://warsaken.cards/002/full/181"},{"id":"002-182","name":"Shore Leave","setid":"002","cardid":"182","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/182","url":"https://warsaken.cards/002/full/182"},{"id":"002-183","name":"Medal of Valor","setid":"002","cardid":"183","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/183","url":"https://warsaken.cards/002/full/183"},{"id":"002-184","name":"Back to the Fray","setid":"002","cardid":"184","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/184","url":"https://warsaken.cards/002/full/184"},{"id":"002-185","name":"Rush Job","setid":"002","cardid":"185","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/185","url":"https://warsaken.cards/002/full/185"},{"id":"002-186","name":"Crossed Lines","setid":"002","cardid":"186","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/186","url":"https://warsaken.cards/002/full/186"},{"id":"002-187","name":"Ready Response","setid":"002","cardid":"187","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/187","url":"https://warsaken.cards/002/full/187"},{"id":"002-188","name":"Fear of the Unknown","setid":"002","cardid":"188","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/188","url":"https://warsaken.cards/002/full/188"},{"id":"002-189","name":"State Reinforcement","setid":"002","cardid":"189","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/189","url":"https://warsaken.cards/002/full/189"},{"id":"002-190","name":"Rationed Resources","setid":"002","cardid":"190","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/190","url":"https://warsaken.cards/002/full/190"},{"id":"002-191","name":"Reunite","setid":"002","cardid":"191","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/191","url":"https://warsaken.cards/002/full/191"},{"id":"002-192","name":"Avalon Academy","setid":"002","cardid":"192","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/192","url":"https://warsaken.cards/002/full/192"},{"id":"002-193","name":"Private Reza Naveed","setid":"002","cardid":"193","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/193","url":"https://warsaken.cards/002/full/193"},{"id":"002-194","name":"Letters from Home","setid":"002","cardid":"194","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/194","url":"https://warsaken.cards/002/full/194"},{"id":"002-195","name":"Resource Silo","setid":"002","cardid":"195","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/195","url":"https://warsaken.cards/002/full/195"},{"id":"002-196","name":"K1 Velocity","setid":"002","cardid":"196","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/196","url":"https://warsaken.cards/002/full/196"},{"id":"002-197","name":"NCS Department","setid":"002","cardid":"197","type":"Building","rarity":"Uncommon","img":"https://wrskn.io/002/full/197","url":"https://warsaken.cards/002/full/197"},{"id":"002-198","name":"Suit X","setid":"002","cardid":"198","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/198","url":"https://warsaken.cards/002/full/198"},{"id":"002-199","name":"Calculated Interference","setid":"002","cardid":"199","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/199","url":"https://warsaken.cards/002/full/199"},{"id":"002-200","name":"Renewal Program","setid":"002","cardid":"200","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/200","url":"https://warsaken.cards/002/full/200"},{"id":"002-201","name":"Propaganda","setid":"002","cardid":"201","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/201","url":"https://warsaken.cards/002/full/201"},{"id":"002-202","name":"Restored Beast","setid":"002","cardid":"202","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/202","url":"https://warsaken.cards/002/full/202"},{"id":"002-203","name":"Instilling Fear","setid":"002","cardid":"203","type":"Morale","rarity":"Uncommon","img":"https://wrskn.io/002/full/203","url":"https://warsaken.cards/002/full/203"},{"id":"002-204","name":"Insidious Root Code","setid":"002","cardid":"204","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/204","url":"https://warsaken.cards/002/full/204"},{"id":"002-205","name":"Decoded Signal","setid":"002","cardid":"205","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/205","url":"https://warsaken.cards/002/full/205"},{"id":"002-206","name":"Skycrane Restoration","setid":"002","cardid":"206","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/206","url":"https://warsaken.cards/002/full/206"},{"id":"002-207","name":"X10 Logistics","setid":"002","cardid":"207","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/207","url":"https://warsaken.cards/002/full/207"},{"id":"002-208","name":"Operational Selection","setid":"002","cardid":"208","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/208","url":"https://warsaken.cards/002/full/208"},{"id":"002-209","name":"A.I. Analysis","setid":"002","cardid":"209","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/209","url":"https://warsaken.cards/002/full/209"},{"id":"002-210","name":"Thermite Grenade","setid":"002","cardid":"210","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/210","url":"https://warsaken.cards/002/full/210"},{"id":"002-211","name":"Denial of Service","setid":"002","cardid":"211","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/211","url":"https://warsaken.cards/002/full/211"},{"id":"002-212","name":"Refinery Shutdown","setid":"002","cardid":"212","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/212","url":"https://warsaken.cards/002/full/212"},{"id":"002-213","name":"Supply Line Breakdown","setid":"002","cardid":"213","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/213","url":"https://warsaken.cards/002/full/213"},{"id":"002-214","name":"Advanced Drafting","setid":"002","cardid":"214","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/214","url":"https://warsaken.cards/002/full/214"},{"id":"002-215","name":"SCUD M-10","setid":"002","cardid":"215","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/215","url":"https://warsaken.cards/002/full/215"},{"id":"002-216","name":"Structural Reclamation","setid":"002","cardid":"216","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/216","url":"https://warsaken.cards/002/full/216"},{"id":"002-217","name":"Dynamic Speed System","setid":"002","cardid":"217","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/217","url":"https://warsaken.cards/002/full/217"},{"id":"002-218","name":"DX-C","setid":"002","cardid":"218","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/218","url":"https://warsaken.cards/002/full/218"},{"id":"002-219","name":"Drone Surveillance","setid":"002","cardid":"219","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/219","url":"https://warsaken.cards/002/full/219"},{"id":"002-220","name":"Weatherize","setid":"002","cardid":"220","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/220","url":"https://warsaken.cards/002/full/220"},{"id":"002-221","name":"Armor Upgrade","setid":"002","cardid":"221","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/221","url":"https://warsaken.cards/002/full/221"},{"id":"002-222","name":"Private Wolfric Hoffman","setid":"002","cardid":"222","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/222","url":"https://warsaken.cards/002/full/222"},{"id":"002-223","name":"H5 Drop Ship","setid":"002","cardid":"223","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/223","url":"https://warsaken.cards/002/full/223"},{"id":"002-224","name":"Detachment","setid":"002","cardid":"224","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/224","url":"https://warsaken.cards/002/full/224"},{"id":"002-225","name":"Ailing Soldier","setid":"002","cardid":"225","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/225","url":"https://warsaken.cards/002/full/225"},{"id":"002-226","name":"Depleted Uranium Rounds","setid":"002","cardid":"226","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/226","url":"https://warsaken.cards/002/full/226"},{"id":"002-227","name":"Tracer Rounds","setid":"002","cardid":"227","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/227","url":"https://warsaken.cards/002/full/227"},{"id":"002-228","name":"For the Cause","setid":"002","cardid":"228","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/228","url":"https://warsaken.cards/002/full/228"},{"id":"002-229","name":"Exploited Design Flaw","setid":"002","cardid":"229","type":"Intel","rarity":"Uncommon","img":"https://wrskn.io/002/full/229","url":"https://warsaken.cards/002/full/229"},{"id":"002-230","name":"Private William Stein","setid":"002","cardid":"230","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/230","url":"https://warsaken.cards/002/full/230"},{"id":"002-231","name":"Sergeant Taven Reid","setid":"002","cardid":"231","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/231","url":"https://warsaken.cards/002/full/231"},{"id":"002-232","name":"TX6","setid":"002","cardid":"232","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/232","url":"https://warsaken.cards/002/full/232"},{"id":"002-233","name":"Abdul Hafiz, the Supplier","setid":"002","cardid":"233","type":"Force","rarity":"Uncommon","img":"https://wrskn.io/002/full/233","url":"https://warsaken.cards/002/full/233"},{"id":"002-234","name":"Treasury Department","setid":"002","cardid":"234","type":"Territory","rarity":"Uncommon","img":"https://wrskn.io/002/full/234","url":"https://warsaken.cards/002/full/234"},{"id":"002-235","name":"Tranquil Sunlight","setid":"002","cardid":"235","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/235","url":"https://warsaken.cards/002/full/235"},{"id":"002-236","name":"Monsoon Storm","setid":"002","cardid":"236","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/236","url":"https://warsaken.cards/002/full/236"},{"id":"002-237","name":"Shattered Ground","setid":"002","cardid":"237","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/237","url":"https://warsaken.cards/002/full/237"},{"id":"002-238","name":"Volcanic Eruption","setid":"002","cardid":"238","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/238","url":"https://warsaken.cards/002/full/238"},{"id":"002-239","name":"Storm Surge","setid":"002","cardid":"239","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/239","url":"https://warsaken.cards/002/full/239"},{"id":"002-240","name":"Hard Freeze","setid":"002","cardid":"240","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/240","url":"https://warsaken.cards/002/full/240"},{"id":"002-241","name":"Air Pollution","setid":"002","cardid":"241","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/241","url":"https://warsaken.cards/002/full/241"},{"id":"002-242","name":"Geomagnetic Disturbance","setid":"002","cardid":"242","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/242","url":"https://warsaken.cards/002/full/242"},{"id":"002-243","name":"Tropical Cyclone","setid":"002","cardid":"243","type":"Weather","rarity":"Uncommon","img":"https://wrskn.io/002/full/243","url":"https://warsaken.cards/002/full/243"},{"id":"002-300","name":"Underworld","setid":"002","cardid":"300","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/300","url":"https://warsaken.cards/002/blkcamofw/300"},{"id":"002-301","name":"Ziegler","setid":"002","cardid":"301","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/301","url":"https://warsaken.cards/002/blkcamofw/301"},{"id":"002-302","name":"De la Croix","setid":"002","cardid":"302","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/302","url":"https://warsaken.cards/002/blkcamofw/302"},{"id":"002-303","name":"Akamu","setid":"002","cardid":"303","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/303","url":"https://warsaken.cards/002/blkcamofw/303"},{"id":"002-304","name":"Bakshi","setid":"002","cardid":"304","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/304","url":"https://warsaken.cards/002/blkcamofw/304"},{"id":"002-305","name":"Sawyer","setid":"002","cardid":"305","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/305","url":"https://warsaken.cards/002/blkcamofw/305"},{"id":"002-306","name":"Auren","setid":"002","cardid":"306","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/306","url":"https://warsaken.cards/002/blkcamofw/306"},{"id":"002-307","name":"Ryker","setid":"002","cardid":"307","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/307","url":"https://warsaken.cards/002/blkcamofw/307"},{"id":"002-308","name":"High Justice","setid":"002","cardid":"308","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/308","url":"https://warsaken.cards/002/blkcamofw/308"},{"id":"002-309","name":"Holt","setid":"002","cardid":"309","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/309","url":"https://warsaken.cards/002/blkcamofw/309"},{"id":"002-310","name":"Ronin","setid":"002","cardid":"310","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/310","url":"https://warsaken.cards/002/blkcamofw/310"},{"id":"002-311","name":"Demidov","setid":"002","cardid":"311","type":"Leader","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/311","url":"https://warsaken.cards/002/blkcamofw/311"},{"id":"002-400","name":"Authentic Underworld","setid":"002","cardid":"400","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/400","url":"https://warsaken.cards/002/gold/400"},{"id":"002-401","name":"Authentic Ziegler","setid":"002","cardid":"401","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/401","url":"https://warsaken.cards/002/gold/401"},{"id":"002-402","name":"Authentic De la Croix","setid":"002","cardid":"402","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/402","url":"https://warsaken.cards/002/gold/402"},{"id":"002-403","name":"Authentic Akamu","setid":"002","cardid":"403","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/403","url":"https://warsaken.cards/002/gold/403"},{"id":"002-404","name":"Authentic Bakshi","setid":"002","cardid":"404","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/404","url":"https://warsaken.cards/002/gold/404"},{"id":"002-405","name":"Authentic Sawyer","setid":"002","cardid":"405","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/405","url":"https://warsaken.cards/002/gold/405"},{"id":"002-406","name":"Authentic Auren","setid":"002","cardid":"406","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/406","url":"https://warsaken.cards/002/gold/406"},{"id":"002-407","name":"Authentic Ryker","setid":"002","cardid":"407","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/407","url":"https://warsaken.cards/002/gold/407"},{"id":"002-408","name":"Authentic High Justice","setid":"002","cardid":"408","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/408","url":"https://warsaken.cards/002/gold/408"},{"id":"002-409","name":"Authentic Holt","setid":"002","cardid":"409","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/409","url":"https://warsaken.cards/002/gold/409"},{"id":"002-410","name":"Authentic Ronin","setid":"002","cardid":"410","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/410","url":"https://warsaken.cards/002/gold/410"},{"id":"002-411","name":"Authentic Demidov","setid":"002","cardid":"411","type":"Leader","rarity":"Unreal","img":"https://wrskn.io/002/gold/411","url":"https://warsaken.cards/002/gold/411"},{"id":"002-412","name":"Tyrant Underworld","setid":"002","cardid":"412","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/412","url":"https://warsaken.cards/002/blood/412"},{"id":"002-413","name":"Tyrant Ziegler","setid":"002","cardid":"413","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/413","url":"https://warsaken.cards/002/blood/413"},{"id":"002-414","name":"Tyrant De la Croix","setid":"002","cardid":"414","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/414","url":"https://warsaken.cards/002/blood/414"},{"id":"002-415","name":"Tyrant Akamu","setid":"002","cardid":"415","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/415","url":"https://warsaken.cards/002/blood/415"},{"id":"002-416","name":"Tyrant Bakshi","setid":"002","cardid":"416","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/416","url":"https://warsaken.cards/002/blood/416"},{"id":"002-417","name":"Tyrant Sawyer","setid":"002","cardid":"417","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/417","url":"https://warsaken.cards/002/blood/417"},{"id":"002-418","name":"Tyrant Auren","setid":"002","cardid":"418","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/418","url":"https://warsaken.cards/002/blood/418"},{"id":"002-419","name":"Tyrant Ryker","setid":"002","cardid":"419","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/419","url":"https://warsaken.cards/002/blood/419"},{"id":"002-420","name":"Tyrant High Justice","setid":"002","cardid":"420","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/420","url":"https://warsaken.cards/002/blood/420"},{"id":"002-421","name":"Tyrant Holt","setid":"002","cardid":"421","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/421","url":"https://warsaken.cards/002/blood/421"},{"id":"002-422","name":"Tyrant Ronin","setid":"002","cardid":"422","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/422","url":"https://warsaken.cards/002/blood/422"},{"id":"002-423","name":"Tyrant Demidov","setid":"002","cardid":"423","type":"Leader","rarity":"One of One","img":"https://wrskn.io/002/blood/423","url":"https://warsaken.cards/002/blood/423"},{"id":"002-500","name":"Dimitrovtek-11 Mech","setid":"002","cardid":"500","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/500","url":"https://warsaken.cards/002/blkcamofw/500"},{"id":"002-501","name":"Goliath 62D","setid":"002","cardid":"501","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/501","url":"https://warsaken.cards/002/blkcamofw/501"},{"id":"002-502","name":"Dark Bear - 2XP","setid":"002","cardid":"502","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/502","url":"https://warsaken.cards/002/blkcamofw/502"},{"id":"002-503","name":"GR Giga Crawler","setid":"002","cardid":"503","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/503","url":"https://warsaken.cards/002/blkcamofw/503"},{"id":"002-504","name":"A96 Knight Hunter","setid":"002","cardid":"504","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/504","url":"https://warsaken.cards/002/blkcamofw/504"},{"id":"002-505","name":"Demon Shield","setid":"002","cardid":"505","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/505","url":"https://warsaken.cards/002/blkcamofw/505"},{"id":"002-506","name":"H3-II Striker","setid":"002","cardid":"506","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/506","url":"https://warsaken.cards/002/blkcamofw/506"},{"id":"002-507","name":"B3 Onzil","setid":"002","cardid":"507","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/507","url":"https://warsaken.cards/002/blkcamofw/507"},{"id":"002-508","name":"VX Cerberus","setid":"002","cardid":"508","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/508","url":"https://warsaken.cards/002/blkcamofw/508"},{"id":"002-509","name":"HX Odin","setid":"002","cardid":"509","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/509","url":"https://warsaken.cards/002/blkcamofw/509"},{"id":"002-510","name":"0X-P Glacier","setid":"002","cardid":"510","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/510","url":"https://warsaken.cards/002/blkcamofw/510"},{"id":"002-511","name":"205X Prototype","setid":"002","cardid":"511","type":"G Force","rarity":"Heroic","img":"https://wrskn.io/002/blkcamofw/511","url":"https://warsaken.cards/002/blkcamofw/511"},{"id":"002-600","name":"VL II Energy Center","setid":"002","cardid":"600","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/600","url":"https://warsaken.cards/002/owner/600"},{"id":"002-601","name":"Ironhead Enclave","setid":"002","cardid":"601","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/601","url":"https://warsaken.cards/002/owner/601"},{"id":"002-602","name":"North Oakworth","setid":"002","cardid":"602","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/602","url":"https://warsaken.cards/002/owner/602"},{"id":"002-603","name":"Solarin Grove","setid":"002","cardid":"603","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/603","url":"https://warsaken.cards/002/owner/603"},{"id":"002-604","name":"Blackearth Mine","setid":"002","cardid":"604","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/604","url":"https://warsaken.cards/002/owner/604"},{"id":"002-605","name":"Moreau Swamp","setid":"002","cardid":"605","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/605","url":"https://warsaken.cards/002/owner/605"},{"id":"002-606","name":"Scrap Yard S3-1035","setid":"002","cardid":"606","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/606","url":"https://warsaken.cards/002/owner/606"},{"id":"002-607","name":"Warehouse Precinct","setid":"002","cardid":"607","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/607","url":"https://warsaken.cards/002/owner/607"},{"id":"002-608","name":"Delicate Terraces","setid":"002","cardid":"608","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/608","url":"https://warsaken.cards/002/owner/608"},{"id":"002-609","name":"Prela Copper Industries","setid":"002","cardid":"609","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/609","url":"https://warsaken.cards/002/owner/609"},{"id":"002-610","name":"Petrochemical Works","setid":"002","cardid":"610","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/610","url":"https://warsaken.cards/002/owner/610"},{"id":"002-611","name":"Bio Incineration Facilities","setid":"002","cardid":"611","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/611","url":"https://warsaken.cards/002/owner/611"},{"id":"002-612","name":"Zimm Manufacturing","setid":"002","cardid":"612","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/612","url":"https://warsaken.cards/002/owner/612"},{"id":"002-613","name":"Hart Natural Gas Center","setid":"002","cardid":"613","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/613","url":"https://warsaken.cards/002/owner/613"},{"id":"002-614","name":"Sola Island Markets","setid":"002","cardid":"614","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/614","url":"https://warsaken.cards/002/owner/614"},{"id":"002-615","name":"Nation's Capital","setid":"002","cardid":"615","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/615","url":"https://warsaken.cards/002/owner/615"},{"id":"002-616","name":"Abandoned Wasteland","setid":"002","cardid":"616","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/616","url":"https://warsaken.cards/002/owner/616"},{"id":"002-617","name":"Clementine Mire","setid":"002","cardid":"617","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/617","url":"https://warsaken.cards/002/owner/617"},{"id":"002-618","name":"Koloa Plantation","setid":"002","cardid":"618","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/618","url":"https://warsaken.cards/002/owner/618"},{"id":"002-619","name":"White Rock Energy","setid":"002","cardid":"619","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/619","url":"https://warsaken.cards/002/owner/619"},{"id":"002-620","name":"Weapons District","setid":"002","cardid":"620","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/620","url":"https://warsaken.cards/002/owner/620"},{"id":"002-621","name":"International Pipelines","setid":"002","cardid":"621","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/621","url":"https://warsaken.cards/002/owner/621"},{"id":"002-622","name":"Brotherland Fields","setid":"002","cardid":"622","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/622","url":"https://warsaken.cards/002/owner/622"},{"id":"002-623","name":"Treasury Department","setid":"002","cardid":"623","type":"Territory","rarity":"One of One","img":"https://wrskn.io/002/owner/623","url":"https://warsaken.cards/002/owner/623"},{"id":"002-900","name":"Generic Resource","setid":"002","cardid":"900","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/002/full/900","url":"https://warsaken.cards/002/full/900"},{"id":"002-901","name":"Food Resource","setid":"002","cardid":"901","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/002/full/901","url":"https://warsaken.cards/002/full/901"},{"id":"002-902","name":"Power Resource","setid":"002","cardid":"902","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/002/full/902","url":"https://warsaken.cards/002/full/902"},{"id":"002-903","name":"Fuel Resource","setid":"002","cardid":"903","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/002/full/903","url":"https://warsaken.cards/002/full/903"},{"id":"002-904","name":"Equipment Resource","setid":"002","cardid":"904","type":"Resource","rarity":"Uncommon","img":"https://wrskn.io/002/full/904","url":"https://warsaken.cards/002/full/904"},{"id":"002-999","name":"First Wave Upgrade","setid":"002","cardid":"999","type":"Upgrade","rarity":"Common","img":"https://wrskn.io/002/up/999","url":"https://warsaken.cards/002/up/999"}];
const RULES = {"version":"1.1.7","lastupdate":"January 30, 2024","keywords":[{"name":"(X) START MORALE","fn":"START_MORALE(X)","text":"","detail":"Triggered mechanic. This sets the start value for your morale in a game and is found exclusively on leader cards. This mechanic is triggered only at the start of the game."},{"name":"(X) CARD START HAND","fn":"CARD_START_HAND(X)","text":"","detail":"Triggered mechanic. This sets the start value for your hand size in a game and is found exclusively on leader cards. If this is not on the leader card you start the game with, default to 8 cards in your starting hand. This mechanic is triggered only at the start of the game."},{"name":"(X) START RESOURCE","fn":"START_RESOURCE(X)","text":"","detail":"Triggered mechanic. This sets the start resource(s) attached to your available on the firs tturn. This mechanic is found exclusively on leader cards. This mechanic is triggered only at the start of the game."},{"name":"(X) (GENERIC) PER TURN","fn":"GENERIC_RESOURCE_PER_TURN(X)","text":"","detail":"Triggered mechanic. Produce an additional (X) generic resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (FOOD) PER TURN","fn":"FOOD_RESOURCE_PER_TURN(X)","text":"","detail":"Triggered mechanic. Produce an additional (X) food resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (POWER) PER TURN","fn":"POWER_RESOURCE_PER_TURN(X)","text":"","detail":"Triggered mechanic. Produce an additional (X) power resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (FUEL) PER TURN","fn":"FUEL_RESOURCE_PER_TURN(X)","text":"","detail":"Triggered mechanic. Produce an additional (X) fuel resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (EQUIPMENT) PER TURN","fn":"EQUIPMENT_RESOURCE_PER_TURN(X)","text":"","detail":"Triggered mechanic. Produce an additional (X) equipment resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) MORALE","fn":"MORALE(X)","text":"","detail":"Triggered mechanic. Adds or subtracts (X) Morale to your legion. Morale can never fall below zero."},{"name":"(X) MORALE PER TURN","fn":"MORALE_PER_TURN(X)","text":"","detail":"Triggered mechanic. Playing this causes a gain or loss of (X) Morale per each turn it is in effect. Morale can never fall below zero."},{"name":"(X) MORALE","fn":"MORALE_ALL(X)","text":"To each player.","detail":"Triggered mechanic. Playing this causes all players to gain or lose (X) Morale. Morale can never fall below zero."},{"name":"(X) MORALE","fn":"ENEMY_MORALE(X)","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Morale. Morale can never fall below zero."},{"name":"(X) MORALE PER TURN","fn":"ENEMY_MORALE_PER_TURN(X)","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Morale per each turn it is in effect. Morale can never fall below zero."},{"name":"MORALE (operator) (X) :","fn":"MORALE_CONDITION(operator, X, ability)","text":"(ability)","detail":"Fixed rule. While morale (condition X) is met, each condition on this is in effect."},{"name":"(X) INTEL","fn":"INTEL(X)","text":"","detail":"Triggered mechanic. Playing this causes a gain or loss of (X) Intel when played. Intel can never fall below zero."},{"name":"(X) INTEL PER TURN","fn":"INTEL_PER_TURN(X)","text":"","detail":"Triggered mechanic. Playing this causes a gain or loss of (X) Intel per each turn it is in effect. Intel can never fall below zero."},{"name":"(X) OWNER INTEL PER TURN","fn":"OWNER_INTEL_PER_TURN(X)","text":"","detail":"Triggered mechanic. Applies (X) Owner Intel to your legion per turn specified. The owner is not necessarily the controller, but rather the person who began the gaem with this card in their deck. Intel can never fall below zero."},{"name":"(X) INTEL","fn":"ENEMY_INTEL(X)","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Intel. Intel can never fall below zero."},{"name":"(X) INTEL PER TURN","fn":"ENEMY_INTEL_PER_TURN(X)","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Intel per each turn it is in effect. Intel can never fall below zero."},{"name":"(X) ATTACK","fn":"ATTACK(X, type text)","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Attack to each (type or subtype) in your legion. Attack can never fall below zero."},{"name":"(X) ATTACK THIS TURN","fn":"ATTACK_THIS_TURN(X, type text)","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Attack to each (type or subtype) in your legion per each specified turn. Attack can never fall below zero."},{"name":"(X) HEALTH","fn":"HEALTH(X, type text)","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in your legion. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH THIS TURN","fn":"HEALTH_THIS_TURN(X, type text)","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in your legion per each specified turn. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH THIS TURN","fn":"ALL_HEALTH_THIS_TURN(X, type text)","text":"To each (type text).","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in all legions this turn. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH","fn":"ENEMY_HEALTH(X, type text)","text":"To each (type text) in a specific enemy legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in a specific enemy legion. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH THIS TURN","fn":"ENEMY_HEALTH_THIS_TURN(X, type text)","text":"To each (type text) in a specific enemy legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in a specific enemy legion per each specified turn. If health is reduced to zero, affected cards are eliminated."},{"name":"ACCESS","fn":"ACCESS","text":"Draw 2 cards. Discard a card.","detail":"Triggered mechanic. When this triggers, draw 2 cards from your arsenal, and then discard 1 card of your choice from your hand."},{"name":"AIR RAID","fn":"AIR_RAID","text":"All enemy territories take 10 damage.","detail":"Triggered mechanic. All enemy players' territories take 10 damage each."},{"name":"ANTI-AIR","fn":"ANTI-AIR","text":"Can block air forces; blocked bombers are eliminated. Air forces don't damage this.","detail":"Fixed rule. Cards with this mechanic are allowed to block air forces during battle. When it blocks a bomber, that bomber force is eliminated. Air forces can't give damage to cards with this mechanic at any point."},{"name":"ANTI-GROUND","fn":"ANTI-GROUND","text":"Can block army and soldier forces.","detail":"Fixed rule. Cards with this mechanic are allowed to block both soldier and army forces during battle."},{"name":"ANTI-NAVAL","fn":"ANTI-NAVAL","text":"Can block navy forces.","detail":"Fixed rule. Cards with this mechanic are allowed to block navy forces during battle."},{"name":"ARMADA","fn":"ARMADA","text":"Find 1 navy force and up to 3 other unique navy forces in your hand, with a cost timer of < 2; put them with your legion; they're ready.","detail":"Triggered mechanic. The first navy force card from your hand can be any navy force card, while the other 3 must have a cost timer of less than 2. Each of the cards put with your legion this way must be unique meaning they have different card names, as uniquness is defined by unique card names. When you put them with your legion you will place them face up as they are ready immediately."},{"name":"ARMORED","fn":"ARMORED","text":"Not affected by dead man and pick-off.","detail":"Fixed rule. Dead man and pick-off mechanics can't affect cards with this mechanic."},{"name":"ARTILLERY","fn":"ARTILLERY","text":"Can't block; can't be blocked by soldiers.","detail":"Fixed rule. A card with this mechanic can't block in battle and can't be blocked by any force with the soldier subtype."},{"name":"ASHES","fn":"ASHES","text":"All soldiers of a specific enemy are eliminated.","detail":"Triggered mechanic. All soldier forces that a specific enemy controls are eliminated."},{"name":"(X) : ATTACH : (TYPE)","fn":"ATTACH(X, TYPE, type text)","text":"Attach (X) (type text) from your arsenal to this; [it's|they're] ready. Shuffle your arsenal. Reattach after every battle, or [it's|they're] eliminated.","detail":"Triggered mechanic. Find (X) number of (type or subtype) from your arsenal and attach them to this card. The player must shuffle their arsenal after finding and attaching the cards. During battle the attached cards detach and act as independent cards, but must re-attach to this card after each battle. If the card with the attach mechanic is eliminated outside of the battle phase before the attached cards are eliminated, the attached cards are eliminated as well."},{"name":"(X) : AMPLIFY : (TYPE)","fn":"AMPLIFY(X, TYPE, type text)","text":"This gains (X) attack for each other (type text) in your legion.","detail":"Fixed rule. A card with this mechanic adds 10 to its attack value for each other card in your legion that matches the specified type or subtype."},{"name":"AWE","fn":"AWE","text":"A specific card without stealth takes 50 damage.","detail":"Triggered mechanic. Choose an eligible enemy force, territory, building, or leader card without stealth and deal 50 damage to it immediately."},{"name":"BEAM","fn":"BEAM","text":"Forces blocked by this lose evade.","detail":"Fixed rule. When the card that has this mechanic blocks a card with the mechanic evade, it's as if that card does not have evade for the duration of the battle."},{"name":"BIG STICK","fn":"BIG_STICK","text":"For each enemy, find a WMD in your arsenal and put it with your legion; it's ready. Gain 1 morale for each WMD in your discard. Shuffle your arsenal.","detail":"Triggered mechanic. For each enemy, find a WMD card in your arsenal and place it face up with your legion to indicate it is ready. Choose the target for each WMD and the order they activate if more than one enters your legion from this mechanic, and then discard them. Count the number of WMD type cards in your discard and gain 1 morale for each, then shuffle your arsenal."},{"name":"BLITZ","fn":"BLITZ","text":"Excess damage gets through a blocker.","detail":"Fixed rule. During battle, if a card blocks this it will still deal damage equal to its attack value, minus the health value of the blocking card, to the original intended eligible target regardless of the blocking card being eliminated or not.."},{"name":"BLIGHT","fn":"BLIGHT","text":"The card this is attached to takes 10 damage for each infected force in your legion; if it's eliminated put this on the bottom of its owner's arsenal.","detail":"Triggered mechanic. As soon as this mechanic is triggered, count the number of forces in your legion with the infected subtype and multiply the number by 10. Deal that number as damage to the card this is attached to. If that damage eliminates the card it was dealt to, put the card with the blight mechanic on the bottom of its owner's arsenal."},{"name":"BLUEPRINT","fn":"BLUEPRINT","text":"Find a specific building in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a building type and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"BOG","fn":"BOG","text":"For each enemey, 2 specific territories take 200 damage. Increase each enemy non-leader timer by 1.","detail":"Triggered mechanic. For each enemy, choose 2 specific territories in their legion to take 200 damage each. All enemy timers, except leader timers, are increased by 1. (This includes countdown, ability, required, and cost timers)."},{"name":"BOMBS","fn":"BOMBS","text":"Can't block; can only damage buildings, territories, and leaders.","detail":"Fixed rule. Cards with this mechanic are not allowed to block. Their damage can only be dealt to building, territory, or leader cards."},{"name":"BOW","fn":"BOW","text":"Find a specific navy force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of navy and show it to other players in the game, after which put it with your legion. Then shuffle your arsenal."},{"name":"BROKEN CODE","fn":"BROKEN_CODE","text":"Enemies play the rest of the game with their hands revealed; for each, find a card in your hand or theirs and put it with your legion; it's ready.","detail":"Triggered mechanic. Once triggered, all enemies will play the entire game from this point forward with their hand visible to the controller of this card. The controller of this card doesn't reveal their hand, only enemies. The player that triggers this ability is allowed to find any card from among each enemy hand or their own if they prefer and put it with their legion. All cards from this ability that are put in the legion are ready right away."},{"name":"BURN","fn":"BURN","text":"If this hits a territory, you may eliminate it and this.","detail":"Fixed rule. If a card with this mechanic deals any amount of damage to a territory in battle, the player in control of this can choose to eliminate the damaged territory and the card with this mechanic immediately."},{"name":"CALCULATED","fn":"CALCULATED","text":"For each enemy, find a drone or mech force in your hand and put it with your legion; it's ready. Each enemey territory takes 100 damage.","detail":"Triggered mechanic. For each enemy, find 1 drone or mech force card in your hand and place it face up with your legion to indicate it's ready. Each enemy territory takes 100 damage."},{"name":"CLOAK","fn":"CLOAK","text":"Can't be blocked if it has covert.","detail":"Fixed rule. As long as this card also has the mechanic covert, the cloak mechanic prevents it from being blocked during battle by any other card, even if that card also has this mechanic."},{"name":"CONDEMNING EVIDENCE","fn":"CONDEMNING_EVIDENCE","text":"Gain 1 intel. A specific opponent loses 1 morale.","detail":"Triggered mechanic. When this triggers, the player in control of a card with this mechanic gains 1 intel and an enemy player loses 1 morale."},{"name":"COVERT","fn":"COVERT","text":"Enemies can't specify this.","detail":"Fixed rule. Cards with this mechanic prevent it from being specified, which means that a card mechanic or rule that uses the word \"specific\" in its description can't apply to cards with this mechanic. It can also not be specified for attack during the attack phase."},{"name":"CRACK SHOT","fn":"CRACK_SHOT","text":"Hits first in battle.","detail":"Fixed rule. During battle, cards with this mechanic deal their attack value as damage before the enemy card, instead of the normal simultaneous damage. If an enemy card that blocks this also has this mechanic it would be as if neither force has this mechanic."},{"name":"CRAFT","fn":"CRAFT","text":"Find a non-soldier force or innovation intel in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a non-soldier force or innovation subtype intel card in your arsenal, show it to all players, and then place it in your hand. Shuffle your arsenal."},{"name":"CULL","fn":"CULL","text":"For each enemy, specifiy a territory and a force in their legion. Their controller eliminates them or all other non-leader cards in their legion.","detail":"Triggered mechanic. Specify a territory and a force card in each enemy legion. The player in control of the specified cards chooses to eliminate them, or all other cards in their legion, except their leader. (This includes forces, buildings, WMD, morale, intel, territories, and unspent resources)."},{"name":"CUNNING","fn":"CUNNING","text":"All soldier forces in your legion have a 2x attack value for each enemy and up to 4 of them are unblockable this turn.","detail":"Triggered mechanic. All soldier forces in your legion gain 2x their attack value for each enemy player in the game. For example if there are 2 enemy players, your soldier forces gain 4x their attack value, if 3 enemy players, 6x their attack value. This 2x calculation happens at the time of this mechanic being triggered. If another mechanic or rule has already changed the attack value, that is the value that will be used in the calculation for this mechanic when it is triggered. Then those soldier forces are unblockable, meaning enemy forces are not allowed to block those soldier forces. Other forces are still blockable."},{"name":"CYCLE","fn":"CYCLE","text":"Each enemy returns a card from their legion to their hand, discards a card, then draws a card.","detail":"Triggered mechanic. Each enemy player returns a card of their choice to their hand, then discards a card of their choice, and finally draws a card."},{"name":"DARK","fn":"DARK","text":"Up to 2 forces have stealth this turn.","detail":"Triggered mechanic. When this ability triggers the controller is allowed to select two forces of any type that can have 'stealth' this turn. Stealth provides this 'Can't be blocked by forces without stealth.' Once this turn is over those forces will lose stealth."},{"name":"DEAD MAN","fn":"DEAD_MAN","text":"If eliminated, eliminate the cause.","detail":"Fixed rule. Cards with this mechanic eliminate the card or cards that caused its elimination, including a leader card if that leader is compromised."},{"name":"DECAY","fn":"DECAY","text":"A specific enemy takes control of this; it can't attack or block.","detail":"Triggered mechanic. A specific enemy player gains control of the card, irrespective of their desire. Once transferred, the card cannot attack or block in battle. Decay and Mole are mutually exclusive on a card. The mechanic activates only for the card's original owner. Upon Decay's activation, the card is considered eliminated, and its remaining abilities retrigger under the new controller's ownership. Importantly, Decay does not trigger if the current controller is not the original owner of the card."},{"name":"DEFECT","fn":"DEFECT","text":"Discard a card. If you do, a specific enemy shows you their hand; discard a force from it to your hand; enemies cant' specifiy your discard pile until your next turn.","detail":"Triggered mechanic. Discard a card from your hand. If you do, choose an enemy player and look at their hand. Discard a force card from their hand, and put it in your hand. Enemy players can't specify your discard pile until your next turn."},{"name":"DELIVER","fn":"DELIVER","text":"Find up to 3 unique army forces or intel in your hand; put them with your legion; they're ready.","detail":"Triggered mechanic. Find 3 unique army-type forces or intel cards in your hand. They can be any mix of those types, but none can be the same titled card. Put all 3 with your legion, skipping their resource costs, and they're ready, meaning skipping their cost timers."},{"name":"DEMO","fn":"DEMO","text":"Eliminate a specific enemy building.","detail":"Triggered mechanic. At the time this mechanic is triggered, you choose an enemy building to eliminate and it is eliminated."},{"name":"DEPART","fn":"DEPART","text":"Discard this.","detail":"Triggered mechanic. At the time this mechanic is triggered, discard the card with this mechanic. Mechanics trigger in order from the top of the card body to the bottom. Any mechanics below this mechanic will not trigger as the card with this mechanic will be discarded before other mechanics can trigger."},{"name":"(X) : DEPLOY : (TYPE)","fn":"DEPLOY(X, TYPE, type text)","text":"Find (X) (type text) in your arsenal, show [it|them], and put [it|them] in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find (X) number of (type or subtype) from your arsenal, show them to all enemy players, and put them in your hand. Shuffle your arsenal."},{"name":"DETECTED MOTION","fn":"DETECTED_MOTION","text":"Enemy legions lose blitz.","detail":"Fixed rule. Each enemy force card with the mechanic blitz no longer has blitz from the moment this fixed rule takes effect."},{"name":"DIGNIFY","fn":"DIGNIFY","text":"Gain 1 morale.","detail":"Triggered mechanic. Gain 1 morale."},{"name":"DISABLED","fn":"DISABLED","text":"Eliminate a specific enemy non-soldier force without stealth, an attack value < 100, and a turn cost < 2.","detail":"Triggered mechanic. You eliminate a specific enemy card in the war zone that is not a solider, does not have the mechanic stealth, has an attack value less than 100 (not including 100), and a turn cost less than 2 (not including 2)."},{"name":"DRAFT","fn":"DRAFT","text":"Find a non-drone soldier force in your hand and put it with your legion.","detail":"Triggered mechanic. Find a non-drone soldier force card in your hand and put it with your legion, obeying any cost timer on the chosen force card."},{"name":"DRAW A CARD","fn":"DRAW_CARD","text":"","detail":"Triggered mechanic. Draw an additional 1 card when the card with this mechanic is ready in the war zone."},{"name":"DRAW (X) CARDS","fn":"DRAW_CARDS(X)","text":"","detail":"Triggered mechanic. Draw an additional (X) cards when the card with this mechanic is ready in the war zone."},{"name":"DRAW A CARD PER TURN","fn":"DRAW_CARD_PER_TURN","text":"","detail":"Triggered mechanic. Draw an additional 1 card when the card with this mechanic is ready in the war zone, and at any point during the play phase for each following turn the card with this mechanic is in the war zone."},{"name":"DRAW (X) CARDS PER TURN","fn":"DRAW_CARDS_PER_TURN(X)","text":"","detail":"Triggered mechanic. Draw an additional (X) cards when the card with this mechanic is ready in the war zone, and at any point during the play phase for each following turn the card with this mechanic is in the war zone."},{"name":"EMP","fn":"EMP","text":"If an air force blocks this, eliminate it.","detail":"Fixed rule. If the card with this mechanic is blocked by an air force card, that card is eliminated before damage is exchanged."},{"name":"ENDED","fn":"ENDED","text":"If this hits a leader or soldier force, eliminate it.","detail":"Fixed rule. If the card with this mechanic is able to deal damage to a leader or soldier force card that card is eliminated, even if the card that has this mechanic is eliminated."},{"name":"EPIDEMIC","fn":"EPIDEMIC","text":"For each enemy, non-drone soldier forces in their legion are infected forces; they lose 5 morale.","detail":"Triggered mechanic. Non-drone soldier forces in enemy legions become the infected subtype. Enemy players lose 5 morale."},{"name":"EXPERIMENT","fn":"EXPERIMENT","text":"If a non-soldier froce was put into your discard this turn, gain 1 intel and draw a card.","detail":"Triggered mechanic. If a non-drone soldier type card was put into your discard during your turn before this ability is triggered, gain 1 intel and draw a card when this ability is triggered."},{"name":"EXPOSED","fn":"EXPOSED","text":"For each enemy, look at the top 4 cards of their arsenal and put 1 with your legion; it's ready; discard the rest. THey lose 4 morale. This is exalted.","detail":"Triggered mechanic. Look at the top 4 cards of each enemy arsenal; choose 1 and put it with your legion face up to indicate it's ready, and discard the rest of the cards seen but not chosen. The enemy player whose arsenal has been looked at loses 4 morale. This card becomes exalted."},{"name":"ECHO","fn":"ECHO","text":"Repeat triggered abilities on this.","detail":"Triggered mechanic. Repeat any other mechanics on the card that are considered a triggered mechanic."},{"name":"ECOSYSTEM","fn":"ECOSYSTEM","text":"Produce 1 extra resource if this has > 200 health or there is a clear weather in the war zone.","detail":"Fixed rule. Produce 1 extra resource of the type listed on this card if it has more than 200 health or there is a weather with the clear subtype in the war zone."},{"name":"ENGINEERED SCANDAL","fn":"ENGINEERED_SCANDAL","text":"Each enemy loses 9 morale. You can't attack this turn.","detail":"Triggered mechanic. Each enemy loses 9 morale. You're not allowed to attack the same turn this mechanic is triggered."},{"name":"EVADE","fn":"EVADE","text":"Takes no damage during battle.","detail":"Fixed rule. When a card with this mechanic attacks or blocks during battle, it takes no damage from enemy forces no matter how large their attack value is as long as the player's card has this mechanic at the time of damage exchange. This rule only applies to damage, it does not include elimination as elimination is not damage."},{"name":"(X) : EVACUATE : (TYPE)","fn":"EVACUATE(X, TYPE, type text)","text":"Put up to (X) specific (type text) from your legion in your hand.","detail":"Triggered mechanic. Choose up to (X) specific (type or subtype) force cards in your legion, and place them in your hand."},{"name":"EXECUTE","fn":"EXECUTE","text":"Eliminate the card this is attached to.","detail":"Triggered mechanic. If the card that has this mechanic is attached to another card at the time of this mechanic triggering, eliminate the card it is attached to."},{"name":"FEAR","fn":"FEAR","text":"When this attacks, its enemy loses 1 morale.","detail":"Triggered mechanic. When a card with this mechanic attacks, the enemy player whose card is specified for attack loses 1 morale. This morale loss happens immediately after the exchange of damage, after an eligible target is specified and any blocker is declared."},{"name":"FINAL SAY","fn":"FINAL_SAY","text":"If eliminated, the cause takes 100 damage.","detail":"Triggered mechanic. A card with this mechanic deals 100 damage to the card that caused its elimination, including a leader card if it's compromised."},{"name":"FINEST","fn":"FINEST","text":"Hits first and before crack shot in battle.","detail":"Fixed rule. During battle, cards with this mechanic deal their attack value as damage before the enemy card even if the blocking card has crack shot, instead of the normal simultaneous damage. If an enemy card that blocks this also has this mechanic it would be as if neither force has this mechanic."},{"name":"FURY","fn":"FURY","text":"Each enemy's top 15 cards from their arsenal are eliminated.","detail":"Fixed rule. Each enemy's top 15 cards from their arsenal are eliminated by this mechanic."},{"name":"GALVANIZE","fn":"GALVANIZE","text":"Gain 1 morale for each morale card you've played this turn, up to 7.","detail":"Triggered mechanic. Gain 1 morale for each morale type card you've played this turn before triggering this mechanic, up to a maximum of 7."},{"name":"GHOST","fn":"GHOST","text":"Enemeis can't eliminate this if you have 5 forces with ghost in your legion. Only 1 instance of this per legion.","detail":"Fixed rule. If there are exactly 5 forces with this mechanic in your legion, enemy players can't eliminate cards with this mechanic in your legion. There can only be 1 uniquely titled card with this mechanic in each player's legion. If a second copy of a card with this mechanic enters a player's legion, its controller chooses which copy to eliminate."},{"name":"GUARD","fn":"GUARD","text":"Returns after battle.","detail":"Fixed rule. A card with this mechanic turns to face the player controlling it immediately after the battle phase, before the next player starts their turn, and is not considered returning."},{"name":"GRAVE ROB","fn":"GRAVE_ROB","text":"Find up to 3 non-drone soldier forces in a specific enemy discard and put them in your discard.","detail":"Triggered mechanic. Choose up to 3 non-drone soldier force cards in an enemy discard pile, and place them in your discard pile."},{"name":"GRIND","fn":"GRIND","text":"Eliminate a non-drone soldier force in your legion. If you do, gain 1 (POWER).","detail":"Triggered mechanic. Eliminate a non-drone soldier force card in your legion. If you do, attach 1 power resource from the resource bank to this card."},{"name":"GRIT","fn":"GRIT","text":"Weather can no longer affect your cards this turn.","detail":"Fixed rule. Weather cards don't affect your cards this turn. This will only apply after the point that the card with this mechanic triggers this mechanic. If the weather card in the war zone prevented resources from being produced they will now produce."},{"name":"HEAL","fn":"HEAL","text":"Find up to 6 non-drone soldier forces in your discard, show them, and put them in your arsenal. Shuffle your arsenal.","detail":"Triggered mechanic. Choose up to 6 non-drone soldier force cards in your discard pile, show them to all enemy players, place them on top of your arsenal, and then shuffle your arsenal."},{"name":"HEIST","fn":"HEIST","text":"For each enemy, take control of a specific territory in their legion.","detail":"Triggered mechanic. For each enemy player in the game you can take control of a territory that can be specified in their legion."},{"name":"HIGH YIELD","fn":"HIGH_YIELD","text":"Produce 1 extra resource.","detail":"Triggered mechanic. Produce 1 extra resource of a type listed on this card."},{"name":"HIJACK","fn":"HIJACK","text":"Take control of a specific non-soldier force without stealth, an attack value < 100, and a turn cost < 2.","detail":"Triggered mechanic. You choose a specific enemy card in the war zone that is not a solider. The specified card cannot have the mechanic stealth, must have an attack value less than 100 (not including 100), and a turn cost less than 2 (not including 2). You take control of that card and it's placed in your legion."},{"name":"HYPERSONIC","fn":"HYPERSONIC","text":"Not affected by anti-air.","detail":"Fixed rule. Cards with the mechanic anti-air can't use anti-air against the card with this mechanic."},{"name":"HYPERSONIC STRIKE","fn":"HYPERSONIC_STRIKE","text":"For each enemy, a specific territory takes 350 damage, a specific territory takes 100 damage, 2 other territories each take 50 damage.","detail":"Triggered mechanic. For each enemy player in the game a specific territory takes 350 damage. Then, a specific territory, which can be the same as the one affected by the first 350 damage takes 100 damage. Two other specific territories each take 50 damage. You decide which of the up to 4 territories take which damage."},{"name":"IMMUNE","fn":"IMMUNE","text":"Not affected by ashes.","detail":"Fixed rule. This card is not eliminated when the mechanic ashes is triggered."},{"name":"IMPOSTER","fn":"IMPOSTER","text":"Use an ability another leader has.","detail":"Triggered mechanic. Copy any single triggered mechanic another leader card has in the game. This can include faster triggered mechanics or slower ones. Leaders in the sideboard of any active player are considered accessible to IMPOSTER as they are considered in the game, any active leader or leader in a sideboard are allowed to be accessed. If the specified leader is not in a sideboard or an active leader in the game then IMPOSTER has no effect."},{"name":"INSIGHT","fn":"INSIGHT","text":"Gain 1 Intel. Draw a card.","detail":"Triggered mechanic. Gain 1 intel. Draw a card."},{"name":"INTELLIGENCE","fn":"INTELLIGENCE","text":"For each enemy, 2 territories or 3 if you have the most intel, each take 50 damage per intel card in your discard pile.","detail":"Triggered mechanic. For each enemy player in the game, 2 of their specific territories (or 3 of their specific territories if you have the most intel among players) each take 50 damage for each intel card in your discard pile at the time this mechanic is triggered. The territories this ability impacts must be specifiable at the time the ability is triggered."},{"name":"INVENT","fn":"INVENT","text":"Find an army force or intel in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is either an army force or an intel card and put it into your hand after showing it to your opponent; then shuffle your arsenal."},{"name":"JET","fn":"JET","text":"Find a specific air force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of air and show it to other players in the game, after which put it with your legion. Then shuffle your arsenal."},{"name":"JOIN","fn":"JOIN","text":"Each non-drone soldier force you own is a ninja force until your next turn.","detail":"Triggered mechanic. Each non-drone soldier force card you own has the ninja subtype until the start of your next turn."},{"name":"KEEN","fn":"KEEN","text":"Not affected by crack shot.","detail":"Fixed rule. The crack shot mechanic can't affect cards with this mechanic."},{"name":"LAUNCH","fn":"LAUNCH","text":"A specific enemy territory, building, or leader takes damage equal to the attack value.","detail":"Triggered mechanic. The card with this mechanic has an attack value. At the time this mechanic is triggered the attack value is dealt as damage to a specific enemy territory, building, or leader. You can't deal this damage do a leader unless that leader is compromised."},{"name":"LOCKOUT","fn":"LOCKOUT","text":"Each player draws a card from the bottom of their arsenal, then each enemy discards a card from their hand to the bottom of their arsenal.","detail":"Triggered mechanic. Each player draws the bottom card of their arsenal, then enemy players discard a card of their choice, placing it facedown on the bottom of their arsenal instead of in their discard pile."},{"name":"LOYALTY","fn":"LOYALTY","text":"Draw 2 cards.","detail":"Triggered mechanic. Draw 2 cards."},{"name":"MELTDOWN","fn":"MELTDOWN","text":"A specific power territory is eliminated.","detail":"Triggered mechanic. A specific territory that is capable of producing power resources is eliminated. This does not have to be an enemy territory."},{"name":"MOLE","fn":"MOLE","text":"A specific enemy takes control of this and it must attack each turn.","detail":"Triggered mechanic. A specific enemy player gains control of the card, irrespective of their desire. Once transferred, the card must attack in battle if able. Mole and Decay are mutually exclusive on a card. The mechanic activates only for the card's original owner. Upon Mole's activation, the card is considered eliminated, and its remaining abilities retrigger under the new player's control. Importantly, Mole does not trigger if the current controller is not the original owner of the card."},{"name":"NAVY","fn":"NAVY","text":"Find a specific navy force in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of navy and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"NUCLEAR","fn":"NUCLEAR","text":"For each enemy, eliminate a specific territory; 2 of their others each take 50 damage.","detail":"Triggered mechanic. For each enemy player in the game, eliminate a specific territory and 2 of their other territories each take 50 damage."},{"name":"NUCLEAR DETONATION","fn":"NUCLEAR_DETONATION","text":"Eliminate a specific enemy territory; 2 of their others each take 50 damage and can't produce on their next turn.","detail":"Triggered mechanic. For a specific enemy player in the game, eliminate a specific territory in their legion and 2 of their other territories each take 50 damage. The damaged territories can't produce on their next turn."},{"name":"OFFICER","fn":"OFFICER","text":"Officers you play cost (GENERIC) and are ready. When you play an officer, return this to your hand.","detail":"Triggered mechanic. Officer subtype cards you play cost 1 generic resource instead of their normal resource cost, and are ready instead of their normal cost timer. When you play another officer subtype card, place the card with this mechanic in your hand."},{"name":"ORBITAL RAILGUN","fn":"ORBITAL_RAILGUN","text":"Each enemy territory takes 200 damage. You can't attack this turn.","detail":"Triggered mechanic. Each enemy territory in the game takes 200 damage. When you use this mechanic you can't attack on the same turn it's used."},{"name":"OUTMATCH","fn":"OUTMATCH","text":"Can't be blocked by forces < rank 3.","detail":"Fixed rule. A card with this mechanic can't be blocked in battle by forces of rank 1 or 2."},{"name":"OUT OF RANGE","fn":"OUT_OF_RANGE","text":"Not affected by pick-off.","detail":"Fixed rule. A card with this mechanic can't be specified for the pick-off mechanic."},{"name":"PATROL","fn":"PATROL","text":"Each battle, a specific enemy soldier or army force loses stealth.","detail":"Triggered mechanic. This triggers during the beginning of each battle. Choose a specific enemy soldier or army force and it loses stealth for the rest of the turn."},{"name":"PICK-OFF","fn":"PICK-OFF","text":"Eliminate a specific enemy force this could block in battle.","detail":"Triggered mechanic. A specific enemy force is eliminated. The specified force must be a force the card with this mechanic is able to block in normal battle."},{"name":"PILFER","fn":"PILFER","text":"Draw a card from a specific enemy arsenal.","detail":"Triggered mechanic. Choose an enemy arsenal and draw the top card from it to your hand."},{"name":"PIRATE","fn":"PIRATE","text":"Take a specific unspent resource from an enemy or gain 1 (GENERIC).","detail":"Triggered mechanic. You can choose any unspent resource from an enemy card and take it, attaching it to the card with this mechanic. If there are no unspent resources to take, you can instead gain 1 generic resource."},{"name":"PREPARED","fn":"PREPARED","text":"Not affected by enemy WMD.","detail":"Fixed rule. Cards with this mechanic can't be affected by enemy WMD cards and their mechanics."},{"name":"PROTECT","fn":"PROTECT","text":"If a soldier force in your legion would be eliminated in battle, you may eliminate this instead.","detail":"Triggered mechanic. If a soldier force card in your legion would be eliminated in battle after attack values are simultaneously traded, you can eliminate a card with this mechanic instead, as long as the card with this mechanic would not also be eliminated in battle."},{"name":"PSYCHE","fn":"PSYCHE","text":"Find a specific morale card in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Choose a morale type card in your arsenal, show it to all enemy players, place it in your hand, and then shuffle your arsenal."},{"name":"PULL","fn":"PULL","text":"Find a specific drone or mech force in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Choose a drone or mech subtype force in your arsenal, show it to all enemy players, place it in your hand, and then shuffle your arsenal."},{"name":"PUSH","fn":"PUSH","text":"Find a specific drone force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of drone and show it to other players in the game, after which put it with your legion. Then shuffle your arsenal."},{"name":"RAID","fn":"RAID","text":"When this attacks, its enemy discards a card.","detail":"Triggered mechanic. When a card with this mechanic attacks, the enemy player whose card is specified for attack discards a card of their choice from their hand. This discard happens immediately after the exchange of damage, after an eligible target is specified and any blocker is declared."},{"name":"RANSOM","fn":"RANSOM","text":"Take control of a specific force with a turn cost < 2; turn it facedown. The owner must pay 1 resource to regain control on their next turn or eliminate it.","detail":"Triggered mechanic. You choose a specific enemy force card they control in the war zone with a turn cost < 2. You take control of that card and place it facedown in your legion attached to the card with this mechanic. The owner may pay 1 resource of any type to you to regain control of it at any point on their next turn. If they don't, eliminate it at the end of their turn. If they pay you, the card control is regained and ready once again in the war zone. Resources paid to you are attached to the card with this mechanic and can be spent normally. If you are the original owner of the card that RANSOM is used to specify then you can pay the resource cost on your next turn instead of the enemy you used RANSOM from, resulting in you regaining control of your original card."},{"name":"RAVAGE & FEAR","fn":"RAVAGE_AND_FEAR","text":"For each enemy, eliminate a specific territory in their legion; they lose 3 more morale.","detail":"Triggered mechanic. For each enemy player in the game, eliminate a specific territory. Each enemy who loses a territory also loses 3 morale in addition to any morale loss triggered by the elimination of the territory."},{"name":"RECALL","fn":"RECALL","text":"Flip a specific enemy non-soldier force with a turn cost < 2 facedown and add a cost timer of 1; it's not ready.","detail":"Triggered mechanic. You choose a specific enemy non-soldier force card in the war zone that has a turn cost of less than 2. Turn it facedown and add a cost timer of 1."},{"name":"RECLAIM","fn":"RECLAIM","text":"Find a specific discarded non-soldier force or innovation intel, show it, and put it in your hand.","detail":"Triggered mechanic. Choose a non-soldier force type or innovation subtype intel card in any player's discard pile, show it to all players, and place it in your hand."},{"name":"RECON","fn":"RECON","text":"Look at the top 4 cards of your arsenal, then put them back in any order. Draw a card.","detail":"Triggered mechanic. Look at the top 4 cards of your arsenal and put them back in any order. If you have fewer than 4 cards, arrange the remaining cards in any order. Draw a card."},{"name":"RE-EDUCATE","fn":"RE-EDUCATE","text":"Take control of a specific non-drone soldier force without stealth and an attack value < 60.","detail":"Triggered mechanic. You choose a specific enemy card with the subtype soldier that is not subtype drone. The specified card cannot have the mechanic stealth, and must have an attack value less than 60 (not including 60). You take control of that card and it's placed in your legion."},{"name":"REIGN","fn":"REIGN","text":"For each enemy, find 2 unique forces in your discard; put them with your legion; they're ready.","detail":"Triggered mechanic. For each enemy player, choose 2 uniquely titled force type cards in your discard pile, and place them with your legion faceup to indicate they're ready."},{"name":"REPAIR","fn":"REPAIR","text":"Remove 30 damage from each territory, building, and leader in your legion.","detail":"Triggered mechanic. Remove 30 damage from all territories, buildings, and leaders in your legion."},{"name":"RESTORE","fn":"RESTORE","text":"Find a specific discarded non-soldier force, show it, and put it with your legion if you pay its resource costs using any resource.","detail":"Triggered mechanic. Choose a non-solder force type card in any player's discard pile, show it to all players, and put it in your legion if you pay any resource at a 1-to-1 ratio for each resource in its resource cost header. Obey any cost timers in that card's cost header."},{"name":"RESTORATION","fn":"RESTORATION","text":"For each enemy, restore 1 of your eliminated territories. Gain 2 morale; this is uncompromised.","detail":"Triggered mechanic. For each enemy, turn 1 one of your eliminated territories faceup. These territories have full health. You gain 2 morale, but any morale lost from the original elimination is not re-gained. If the leader that has this mechanic was compromised, it is no longer compromised."},{"name":"REVENGE","fn":"REVENGE","text":"Each enemy's top 25 cards from their arsenal are eliminated. You can't attack this turn.","detail":"Triggered mechanic. For each enemy, move the top 25 cards from their arsenal to their discard pile. You can't attack this turn."},{"name":"RIPPLE","fn":"RIPPLE","text":"Each battle, a specific enemy navy force loses stealth.","detail":"Triggered mechanic. This triggers during the beginning of each battle. Choose a specific enemy navy type force and it loses stealth for the rest of the turn."},{"name":"RUIN","fn":"RUIN","text":"Eliminate a specific enemy territory.","detail":"Triggered mechanic. Choose a territory in any legion and eliminate it."},{"name":"SALVAGE","fn":"SALVAGE","text":"Put a specific non-soldier force from an enemy discard into your discard.","detail":"Triggered mechanic. Choose a non-soldier force type card in an enemy discard pile and place it in your discard pile."},{"name":"SCRAP","fn":"SCRAP","text":"For each eliminated territory, gain 1 (GENERIC).","detail":"Triggered mechanic. For each eliminated territory in each legion, gain 1 generic resource from the resource bank and attach it to this card."},{"name":"SEARCH","fn":"SEARCH","text":"Find a specific card in your arsenal and place it on top after you shuffle your arsenal.","detail":"Triggered mechanic. Find a specific card in your arsenal. Shuffle your arsenal, then put this card on top of your arsenal."},{"name":"SEEK","fn":"SEEK","text":"Enemy legions lose stealth.","detail":"Fixed rule. Each enemy card with the stealth mechanic no longer has the stealth mechanic while this mechanic is in effect."},{"name":"SETUP","fn":"SETUP","text":"This can't produce on your first turn.","detail":"Fixed rule. This card can't produce on your first turn of the game."},{"name":"SHATTER","fn":"SHATTER","text":"Each enemy building takes 150 damage. Each enemy territory takes 100 damage.","detail":"Triggered mechanic. Each building type card in an enemy player's legion takes 150 damage. Each territory type card in an enemy player's legion takes 100 damage."},{"name":"SHOCK","fn":"SHOCK","text":"A specific building or territory takes 140 damage.","detail":"Triggered mechanic. Choose a building or territory type card in any legion and it takes 140 damage."},{"name":"SHOW OF FORCE","fn":"SHOW_OF_FORCE","text":"All enemies lose 1 morale for each air force in your legion.","detail":"Triggered mechanic. All enemies lose 1 morale for each air force in your legion."},{"name":"SHUT OFF","fn":"SHUT_OFF","text":"A specific enemy can't produce fuel resources on their next turn.","detail":"Triggered mechanic. Choose an enemy; any cards in their legion that can produce fuel resources can't do so on that player's next turn."},{"name":"SLAUGHTER","fn":"SLAUGHTER","text":"Eliminate a territory in your legion. For each enemy, eliminate up to 2 specific territories in their legion. You can't attack this turn.","detail":"Triggered mechanic. Choose a territory in your legion and eliminate it. For each enemy, choose up to 2 territories in their legion and eliminate them. You can't attack this turn. (If you have no territories to eliminate in your legion, the rest of this ability still triggers)."},{"name":"SOLO","fn":"SOLO","text":"Can't be attached to other cards.","detail":"Fixed rule. A card with this mechanic can't be chosen to be attached to other cards."},{"name":"SPARK","fn":"SPARK","text":"If an enemy controls a power territory gain 1 (POWER).","detail":"Triggered mechanic. If an enemy controls a territory with the power subtype, gain 1 power resource from the resource bank and attach it to this."},{"name":"SPENT","fn":"SPENT","text":"Eliminate this.","detail":"Triggered mechanic. Eliminate this card as soon as this mechanic is triggered."},{"name":"SPOT","fn":"SPOT","text":"Each battle, a specific enemy air force loses stealth.","detail":"Triggered mechanic. This triggers during the beginning of each battle. Choose a specific enemy air type force and it loses stealth for the rest of the turn."},{"name":"SPREAD","fn":"SPREAD","text":"Attach this to a non-drone, non-infected solider force in your legion; it's an infected force for the rest of the game. You lose 1 morale.","detail":"Triggered mechanic. Attach this to a non-drone, non-infected soldier type force card in your legion, and it gains the infected subtype for the rest of the game. Lose 1 morale."},{"name":"STEALTH","fn":"STEALTH","text":"Can't be blocked by forces without stealth.","detail":"Fixed rule. Only cards with stealth can block this card. If this card is blocked, normal battle rules apply."},{"name":"STUN","fn":"STUN","text":"Flip a specific enemy force this could block with a turn cost < 2 facedown and add a cost timer of 1; it's not ready.","detail":"Triggered mechanic. Choose an enemy force type card with a cost timer of 0 or 1 that this card could block in battle, flip it facedown to indicate it's not ready, and add a cost timer of 1 to it."},{"name":"SUB ATTACK","fn":"SUB_ATTACK","text":"For each enemy, eliminate a specific territory. Up to 4 sub forces in your legion have stealth this turn.","detail":"Triggered mechanic. For each enemy, choose a territory and eliminate it. Choose up to 4 force cards with the sub subtype in your legion, and they gain stealth for the rest of the turn. (STEALTH: Can't be blocked by forces without stealth.)."},{"name":"SUBS","fn":"SUBS","text":"Find a specific sub force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a force type card in your arsenal with the sub subtype, show it to all players, and put it with your legion, obeying any cost timers on it. Shuffle your arsenal."},{"name":"SUBVERT","fn":"SUBVERT","text":"Each enemy discards 2 cards.","detail":"Triggered mechanic. Each enemy chooses two cards from their hand and discards them."},{"name":"SUPPLY","fn":"SUPPLY","text":"Produce 2 extra resources on your first turn.","detail":"Triggered mechanic. During the produce phase of your first turn, this card produces 2 extra resources of the type listed on the card. This ability only produces an extra 2 resources total for the entire game."},{"name":"SURPLUS","fn":"SURPLUS","text":"Gain 2 (GENERIC).","detail":"Triggered mechanic. Attach 2 generic resources to this card."},{"name":"SURVEIL","fn":"SURVEIL","text":"A specific enemy shows you their hand.","detail":"Triggered mechanic. Choose an enemy player and they show you the cards in their hand."},{"name":"SUSPEND","fn":"SUSPEND","text":"A specifc enemy can't produce generic resources on their next turn.","detail":"Triggered mechanic. Choose an enemy player; cards in their legion that could produce generic resources can't do so on their next turn."},{"name":"SWAMPED","fn":"SWAMPED","text":"Increase a specific enemy non-leader, non-territory timer by 1.","detail":"Triggered mechanic. Choose a countdown or cost timer in an enemy player's legion that isn't on a leader or territory type card and increase it by 1."},{"name":"TACTICAL STRIKE","fn":"TACTICAL_STRIKE","text":"A specific enemy force, building, or territory takes 300 damage.","detail":"Triggered mechanic. Choose a force, building, or territory type card in an enemy player's legion and it takes 300 damage."},{"name":"TAX","fn":"TAX","text":"Lose 3 morale. Gain 5 (GENERIC).","detail":"Triggered mechanic. Lose 3 morale. Gain 5 generic resources. (If you have less than 3 morale, the rest of this mechanic still triggers)."},{"name":"TEMPER","fn":"TEMPER","text":"For each enemy, eliminate a specific territory, or 2 if you have > 50 morale.","detail":"Triggered mechanic. Choose a territory in each enemy player's legion and eliminate it. If you have more than 50 morale, choose another territory in each enemy player's legion and eliminate it."},{"name":"TERRITORIAL","fn":"TERRITORIAL","text":"Eliminate all other supplier forces.","detail":"Triggered mechanic. When this card becomes ready in the war zone, eliminate all other supplier forces from the war zone."},{"name":"UNVEIL","fn":"UNVEIL","text":"Look at the top card of a specific arsenal.","detail":"Triggered mechanic. Choose any player's arsenal and look at the top card."},{"name":"VOW","fn":"VOW","text":"Find a specific ninja force in your arsenal or discard, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal or discard pile that is a force type card with a subtype of ninja and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"WEATHER","fn":"WEATHER","text":"Find a specific weather in your arsenal, show it, and put it in your hand.","detail":"Triggered mechanic. Find a card in your arsenal that is a weather card and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"WEATHERPROOF","fn":"WEATHERPROOF","text":"Not affected by weather.","detail":"Fixed rule. Cards with this mechanic can't be affected by weather cards and their mechanics."},{"name":"WORK STOP","fn":"WORK_STOP","text":"A specific enemy can't produce equipment resources on their next turn.","detail":"Triggered mechanic. You choose 1 enemy. That enemy cannot produce equipment resources during any stage of their next turn."},{"name":"X10","fn":"X10","text":"For each enemy, eliminate a specific territory in their legion and draw 2 cards; for each card drawn, shuffle 2 cards from your discard into your arsenal.","detail":"Triggered mechanic. Choose a territory type card in each enemy player's legion, eliminate it, and draw 2 cards. For each card you draw, choose 2 cards in your discard pile and put them on top of your arsenal, then shuffle your arsenal."}],"deckRules":{"totalCards":65,"leaders":1,"territories":4,"arsenal":60,"maxCopies":4},"definitions":[{"name":"War Zone","text":"The war zone is the area where the game is played."},{"name":"Legion","text":"All the cards in the war zone that originated from a deck and you control are your legion."},{"name":"Deck","text":"All the cards that you need to play the game. You must have no more or less than 65 cards in your deck to play the game. The following cards make up your deck: 1 Leader card; 4 Territory cards (all territories must be unique); 60 Arsenal cards (maximum 4 copies of any same titled card are allowed in the arsenal)."},{"name":"Arsenal","text":"All the forces, buildings, WMD, weather, morale, and intel cards you play with during a game. This does not include leader or territory cards."},{"name":"Hand","text":"All cards you hold during game play are your hand. There is no maximum hand size, and all cards are drawn into your hand."},{"name":"Discard pile","text":"A face up pile where cards are discarded."},{"name":"Intel","text":"In war, intel is information or advancements of military or political value. In Warsaken, intel strategically impacts gameplay by allowing you to gain an advantage over your enemies without going to battle. Intel is monitored using counters, and all players start the game with 0 intel. If the player with the most intel has 6 or more than any enemy player, those enemy players can't play intel cards until they increase their intel. If no player has the 6 intel advantage, all players can play intel cards."},{"name":"Morale","text":"Morale is the confidence, enthusiasm, and discipline at a particular time within your legion. Player morale is monitored using counters. Your starting morale is calculated by adding the start morale shown on your leader card with the morale shown on any of your 4 territories. Morale can be increased or decreased depending on the cards played during the game. You must keep your morale above zero to play morale cards and to keep your leader from being compromised."},{"name":"Card Title","text":"The card title is the name shown at the very top of every card."},{"name":"Cost Header","text":"The cost header consists of both the cost timer (see Timers definition) and resource costs (see Resource cards for how to pay resources)."},{"name":"Card Type","text":"There are 8 primary card types including Leaders, Territories, Forces, WMD, Intel, Morale, Buildings, and Weather. There are also Resource cards but they are not considered a primary card type and are not a part of a player's arsenal."},{"name":"Card Subtypes","text":"Subtypes are found to the right of primary card type. As an example, Force > Soldier > Sniper; in this example both Soldier and Sniper are subtypes."},{"name":"Attack Values","text":"The attack value can be found at the top of every card body, and is the number on the left. The attack value is the amount of damage the card can deal to an enemy."},{"name":"Health Values","text":"The health value can be found at the top of every card body, and is the number on the right. The health value is the amount of damage the card can take before it is eliminated."},{"name":"Warning Messages","text":"Some card types have a warning message and can be found near the bottom of the card body. Warning messages alert the player of a requirement to play the card, or a specific loss in morale should the card be eliminated from thier legion."},{"name":"Card Mechanics","text":"The card mechanics are special instructions or abilities found in the body of many cards. If there is a discrepancy between the game rules and the mechanics on the card, the card mechanics take priority. See the Card Mechanics Section for a description of each card mechanic."},{"name":"Counters","text":"A counter is any device that can be used to keep track of the number of times a particular event has occurred, or to count down to a particular event, such as an ability being ready for use. Dice are recommended for counters, but a pencil and paper, or any other type of counter can be used."},{"name":"Control","text":"A ready card in a legion is under the control of the player whose legion it is."},{"name":"Own / Owner / Ownership","text":"A player is considered the owner of all cards that were in their deck and sideboard at the start of the game."},{"name":"Ready","text":"A card is ready when it is turned or placed faceup, then its mechanics can be resolved. A card can become ready either after its costs have been paid, or when a card mechanic allows you to ignore its costs. When a card becomes ready, any attached cards are discarded."},{"name":"Not Ready","text":"A card is not ready when it is turned or placed facedown in the war zone. None of its information is considered to be in the game yet; it has no type until it's ready other than still being a card."},{"name":"Returning","text":"A card is considered returning if it attacked in battle, or is turned to face away from its controller by another card effect. Returning cards can't block in battle. In the return phase of a players turn, all returning cards are turned to face them, indicating their availability for use in battle again, unless otherwise stated by a card effect or mechanic."},{"name":"Timers","text":"Timers are needed to count down each turn until a card, or card mechanic, is ready or can be used. Timers are reduced during the reduction phase of a turn, or by the effects of specific cards or abilities."},{"name":"Cost timers","text":"The cost timer can be found in the card header and represents the number of turns to delay until the card is ready. When the cost timer reaches zero the cost is considered paid and the card is ready. The timer is no longer needed and is put aside, and the card is turned face up. Cost timers are not found on Leader or territory cards."},{"name":"Countdown timers","text":"The countdown timer can be found in the body of the card. The number on the timer represents the number of turns until a card mechanic can be used. When a countdown timer is reduced to zero, then the mechanic can be resolved during the play phase. The card mechanic, next to the countdown timer, doesn't have to be resolved when the timer reaches zero. Mechanics that are not resolved during the turn they are ready can be saved for future turns. After use, countdown timers are reset back to the original count shown on the card and will count down repeatedly during the game."},{"name":"Required countdown timers","text":"The required countdown timer looks similar to and appears in the same location as a normal countdown timer, but the required countdown timer will have a red x on it. When the countdown timer reaches zero, the mechanic next to it must be resolved immediately. After use, required countdown timers are reset back to the original count shown on the card and will countdown repeatedly during the game."},{"name":"Resource Bank","text":"The resource bank is a communal area where the 5 resource card types are placed. All players can use these cards as needed to play the game. Alternatively, each player can have their own personal resource bank."},{"name":"Rule Validation","text":"To validate a player is to confirm that they did not make a mistake while playing a card during their turn. If a player is caught playing the wrong card, placing the wrong timer, or using the wrong amount or type of resources, they must discard that card and any attached resources. You must validate another player before they attack or pass their turn. If a player plays a card in an invalid way more than once, that player forfeits the game."},{"name":"Eliminated","text":"A card is eliminated when its health has been reduced to zero or a card mechanic specifies. Leader and territory cards are turned facedown when eliminated. All other eliminated cards are placed in the discard pile."},{"name":"Compromised Leader","text":"This condition is permanent and cannot be reversed by any change of these conditions unless stated on a card that causes a reversal. No leader can take damage or be eliminated by any source unless they are compromised. There are 3 events that will compromise your leader:"}],"cardTypes":[{"name":"Leader","text":"Leader cards are the core of your deck and define your start morale and style of game play. Leaders have abilities that count down and repeat throughout the game. Leader cards are in the war zone at the start of the game and remain there until eliminated."},{"name":"Territory","text":"Territory cards' main purpose is to produce resources. Each territory contains boxes that show the type and quantity of resources it will produce each turn. Once a territory is eliminated it is turned facedown and can no longer produce resources. Territory cards are in the war zone at the start of the game and remain there until eliminated."},{"name":"Force","text":"Force cards are used to attack or block during battle and are divided into 3 groups: Ground (Soldiers and Army), Navy, and Air. Force cards stay in the war zone once ready."},{"name":"WMD","text":"Weapons of Mass Destruction cards are used to disrupt, eliminate forces, and deal damage to an enemy directly. Some WMD cards must be attached to other cards. WMD cards are discarded as soon as they are played, unless otherwise stated on the card."},{"name":"Intel","text":"Intel cards are used to draw more cards, stifle enemy players, sneak cards into the war zone, and more. You can play an Intel card if you have the most Intel, or are within 6 of the player with the most Intel. All Intel cards have a zero countdown timer and are resolved immediately. Some intel cards can be attached to other cards, but are primarily discard as soon as they are played."},{"name":"Morale","text":"Morale cards are used to increase or decrease morale during game play. Much like a real war, a Leader needs the support of the people. Morale can be spent just like any another resource. Once morale is reduced to zero, that Leader is compromised and can be attacked directly. Morale cards cannot be played by a player with zero morale. Territories and buildings cause morale loss when they are eliminated, with a few exceptions. Morale cards are discarded as soon as they are played, unless otherwise stated on the card. If a card would increase your morale after it has been reduced to zero it still increases your morale, even if your leader is compromised."},{"name":"Building","text":"Buildings are used to attack or block an enemy, generate resources, or provide additional effects and abilities to a player and their legion. A player will lose morale when they're eliminated."},{"name":"Weather","text":"Weather cards are used to cause certain conditions to the war zone that will affect all players. They are placed sideways in the middle of the war zone when played. Weather cards have a cost timer of zero, so they are effective immediately. 1 weather card can be played per turn and will be discarded on your next turn. There can be only 1 active weather card in the war zone at a time. If at the start of a turn there is a weather card in the center of the war zone, you may eliminate it with your own weather card."},{"name":"Resource","text":"Resource cards are used to track resources that have been generated or used to play cards. There are 5 different resource types including Generic, Food, Power, Fuel, and Equipment. Resource cards can be exchanged at a 2:1 ratio for another non-generic resource, and any non-generic resource can be exchanged at a 1:1 ratio for a generic resource. (For example, 2 of any resource you have in your legion can be swapped with the resource bank for a food, power, fuel, or equipment resource. Any 1 food, power, fuel, or equipment resource can be swapped with the resource bank for 1 generic resource). Resource cards are not a part of a player's deck. If a resource card would be placed in a players hand, it is instead eliminated and returned to the resource bank."}],"phases":[{"name":"Return phase","text":"On your previous turn, during the battle phase (see below for battle phase), cards used to attack are turned to face away from you. During the return phase, turn the returning cards to face you, showing that they are available again for play. Discard any weather cards you placed in the middle of the war zone on your previous turn to your discard pile."},{"name":"Draw phase","text":"Draw 1 card from your arsenal and put it in your hand."},{"name":"Reduce phase","text":"On each of your turns you must reduce the number on all timers by 1. If a card's cost timer is paid (reduced to 0) during this phase, it is ready. Return all attached resources to the resource bank, turn the card face up, then resolve the card mechanics on that card before proceeding to the next phase."},{"name":"Produce phase","text":"Territories and any other resource-producing cards in your legion now produce their resources. Attach the correct number of each resource type to your resource producing cards. If a producing card is eliminated, the resources attached to it are also eliminated. Unspent resources are retained and stay attached to the producing card for use in later turns. Resource production automatically triggers once this phase is reached, and after this point any card that can produce that hasn't produced on this turn, automatically produces once ready. (Producing cards can be affected by weather and card mechanics. If any effects stopping production are removed during your play phase, the producing card immediately produces the resources it could)."},{"name":"Play phase","text":"Playing a card means placing it into the war zone and paying its costs. To play a card you must first determine if you have produced enough resources to pay for it. If you don't have the required resources you can't play it. Select the card from your hand that you wish to add to your legion and place it in the war zone. Don't show your cards unless stated by the card mechanics. Attach the correct amount of unspent resources to the card according to its resource cost. If the card has a cost timer of zero then place it faceup in the war zone and put the resources back in the resource bank, then resolve the card mechanics on the card. If the card has a cost timer of more than zero, place the card facedown and put the required cost timer on it. During this phase, enemies have the opportunity to validate cards you play faceup. Cards that are played facedown cannot be validated until they are turned faceup. Look at all your other cards that are in the war zone and resolve any card mechanics that are ready and valid this turn. At this point, you can choose to pass the turn to the next player, or move to the battle phase."},{"name":"Attack","text":"During the battle phase, you can attack enemy buildings, territories, or leaders. Some force cards are also available for attack, and will state this condition in their ability text. You can attack 1 card with multiple forces, but cannot attack multiple cards with 1 card. Declare which cards will attack by turning them to face away from you. You can attack more than 1 enemy during your turn. After your card attacks, keep it turned to face away from you to indicate that it is returning. Any card that you used to attack is considered returning, and can't be used to block until it is returned to face towards you, unless otherwise stated on the card."},{"name":"Blocking","text":"Once you have declared which cards you will use to attack and which specific cards to attack, your enemy then declares which cards they will use to block your attacking forces. Only 1 card can block 1 attacker at a time. Damage is dealt simultaneously between attacker and blocker. If the card taking the damage has been given damage equal to or greater than its health value, it's eliminated. Force cards and some buildings can be used to block an enemy. Forces can only block their own type; ground forces (soldier and army forces) can block ground, air forces can block air, and navy can block navy. If a card can block a different type of card, it will be displayed on the card mechanics. If an attacking card is not blocked, all damage will be dealt directly to the specified building, territory, force, or leader. Damage dealt to a building, territory, or leader is permanent and its health is reduced. Damage is not permanent for force cards. If a force card still has health at the end of the battle phase, it is not eliminated, and its full health is recovered after the battle phase. If the specified card's health is reduced to zero, or would be less than zero, it's eliminated. If the blocking card is eliminated, any excess damage does not go through to the specified building, territory, force, or leader, unless otherwise stated on the card."}]};

// ============================================================================
// ENRICHED CARD DATA — 671 cards with full stats, keywords, costs from warsaken.cards
// ============================================================================


// ============================================================================
// OFFICIAL DECK RECIPES — 37 decks (10 Blitz, 27 Standard) authored by the
// game’s creators. Sourced from rules.warsaken.com/decks. Each recipe is a
// complete 65-card (or Blitz format) build keyed to a leader.
// ============================================================================
const RECIPES = [{"title":"Elite Ops","mode":"Blitz","leaderId":"001-201","leaderName":"Commander Wilfred Louis","themes":["Soldier","Spy"],"cards":[{"id":"001-201","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"Tank You Very Much","mode":"Blitz","leaderId":"001-001","leaderName":"Chancellor Lockwood","themes":["Tank","WMD"],"cards":[{"id":"001-001","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Army","subtype2":"Tank"},"qty":4},{"filter":{"type":"Force","subtype1":"Army","subtype2":"Tank"},"qty":4},{"filter":{"type":"Force","subtype1":"Army","subtype2":"Tank"},"qty":4},{"filter":{"type":"Force","subtype1":"Army","subtype2":"Tank"},"qty":4},{"filter":{"type":"Force","subtype1":"Army","subtype2":"Tank"},"qty":4},{"filter":{"type":"Force","subtype1":"Army","subtype2":"Tank"},"qty":4},{"filter":{"type":"Force","subtype1":"Army","subtype2":"Tank"},"qty":4},{"filter":{"type":"WMD","subtype1":"Nuclear"},"qty":4},{"filter":{"type":"WMD","subtype1":"Nuclear"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"Perfectly Balanced","mode":"Blitz","leaderId":"001-000","leaderName":"Roman Volkov, the Exile","themes":["Air","Navy","Army","WMD","Morale","Soldier"],"cards":[{"id":"001-000","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Army"},"qty":4},{"filter":{"type":"Force","subtype1":"Army"},"qty":4},{"filter":{"type":"Force","subtype1":"Army"},"qty":4},{"filter":{"type":"Force","subtype1":"Army"},"qty":4},{"filter":{"type":"Force","subtype1":"Navy"},"qty":4},{"filter":{"type":"Force","subtype1":"Navy"},"qty":4},{"filter":{"type":"Force","subtype1":"Air"},"qty":4},{"filter":{"type":"Force","subtype1":"Air"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"Changing Weather","mode":"Blitz","leaderId":"001-006","leaderName":"Premier Zoff","themes":["Weather"],"cards":[{"id":"001-006","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force"},"qty":4},{"filter":{"type":"Force"},"qty":4},{"filter":{"type":"Force"},"qty":4},{"filter":{"type":"Force"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"Anonymous Control","mode":"Blitz","leaderId":"001-202","leaderName":"Victor, the Anonymous","themes":["Weather","Soldier","Spy"],"cards":[{"id":"001-202","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"To the Skies","mode":"Blitz","leaderId":"001-205","leaderName":"Riku Ito, Ace","themes":["Air","Morale"],"cards":[{"id":"001-205","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Swarm"},"qty":4},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Fighter"},"qty":4},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Fighter"},"qty":4},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Wingman"},"qty":4},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Bomber"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"Don't Get In My Way","mode":"Blitz","leaderId":"001-204","leaderName":"Admiral Bancroft","themes":["Navy","WMD","Sub"],"cards":[{"id":"001-204","qty":1},{"id":"001-235","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Navy","subtype2":"Sub"},"qty":4},{"filter":{"type":"Force","subtype1":"Navy","subtype2":"Sub"},"qty":4},{"filter":{"type":"Force","subtype1":"Navy","subtype2":"Sub"},"qty":4},{"filter":{"type":"Force","subtype1":"Navy","subtype2":"Sub"},"qty":4},{"filter":{"type":"Force","subtype1":"Navy"},"qty":4},{"filter":{"type":"Force","subtype1":"Navy"},"qty":4},{"id":"001-021","qty":4},{"id":"001-022","qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"Political Waters","mode":"Blitz","leaderId":"001-004","leaderName":"President Zeana","themes":["Morale","Assassin","Spy"],"cards":[{"id":"001-004","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Assassin"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Spy"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Morale"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"The Way","mode":"Blitz","leaderId":"001-008","leaderName":"Great Emperor Shang Lee","themes":["Soldier","Ninja"],"cards":[{"id":"001-008","qty":1},{"id":"001-173","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Ninja"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Ninja"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Ninja"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Ninja"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Ninja"},"qty":4},{"filter":{"type":"Force","subtype1":"Soldier","subtype2":"Ninja"},"qty":4},{"id":"001-111","qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"id":"001-170","qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"Boooom","mode":"Blitz","leaderId":"001-203","leaderName":"Governor Key","themes":["WMD","Bomber"],"cards":[{"id":"001-203","qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Territory"},"qty":1},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Bomber"},"qty":4},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Bomber"},"qty":4},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Bomber"},"qty":4},{"filter":{"type":"Force","subtype1":"Air","subtype2":"Bomber"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"WMD"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Intel"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Building"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4},{"filter":{"type":"Weather"},"qty":4}]},{"title":"The Exile","mode":"Standard","leaderId":"001-000","leaderName":"Roman Volkov, the Exile","themes":["Force","WMD"],"cards":[{"id":"001-000","qty":1},{"id":"001-157","qty":1},{"id":"001-164","qty":1},{"id":"001-230","qty":1},{"id":"001-233","qty":1},{"id":"001-093","qty":3},{"id":"001-037","qty":4},{"id":"001-156","qty":4},{"id":"001-135","qty":4},{"id":"001-138","qty":3},{"id":"001-161","qty":3},{"id":"001-084","qty":4},{"id":"001-035","qty":3},{"id":"001-142","qty":4},{"id":"001-097","qty":4},{"id":"001-120","qty":4},{"id":"001-159","qty":4},{"id":"001-034","qty":3},{"id":"001-032","qty":3},{"id":"001-239","qty":3},{"id":"001-019","qty":3},{"id":"001-115","qty":4}]},{"title":"They Will Bleed","mode":"Standard","leaderId":"001-000","leaderName":"Roman Volkov, the Exile","themes":["Force","WMD"],"cards":[{"id":"001-000","qty":1},{"id":"001-158","qty":1},{"id":"001-164","qty":1},{"id":"001-219","qty":1},{"id":"001-233","qty":1},{"id":"001-159","qty":4},{"id":"001-218","qty":4},{"id":"001-073","qty":4},{"id":"001-156","qty":4},{"id":"001-041","qty":4},{"id":"001-035","qty":4},{"id":"001-037","qty":4},{"id":"001-115","qty":4},{"id":"001-131","qty":3},{"id":"001-138","qty":3},{"id":"001-093","qty":4},{"id":"001-097","qty":4},{"id":"001-101","qty":2},{"id":"001-161","qty":4},{"id":"001-083","qty":4},{"id":"001-120","qty":4}]},{"title":"Lockwood's Fury","mode":"Standard","leaderId":"001-001","leaderName":"Chancellor Lockwood","themes":["WMD","Tank"],"cards":[{"id":"001-001","qty":1},{"id":"001-014","qty":1},{"id":"001-184","qty":1},{"id":"001-225","qty":1},{"id":"001-229","qty":1},{"id":"001-018","qty":4},{"id":"001-042","qty":4},{"id":"001-046","qty":3},{"id":"001-052","qty":3},{"id":"001-056","qty":3},{"id":"001-057","qty":3},{"id":"001-058","qty":4},{"id":"001-061","qty":4},{"id":"001-069","qty":3},{"id":"001-078","qty":4},{"id":"001-088","qty":4},{"id":"001-104","qty":3},{"id":"001-117","qty":3},{"id":"001-122","qty":4},{"id":"001-131","qty":3},{"id":"001-136","qty":4},{"id":"001-156","qty":4}]},{"title":"Rizland Aggression","mode":"Standard","leaderId":"001-001","leaderName":"Chancellor Lockwood","themes":["Tank"],"cards":[{"id":"001-001","qty":1},{"id":"001-014","qty":1},{"id":"001-148","qty":1},{"id":"001-228","qty":1},{"id":"001-229","qty":1},{"id":"001-056","qty":4},{"id":"001-210","qty":4},{"id":"001-058","qty":4},{"id":"001-057","qty":4},{"id":"001-214","qty":3},{"id":"001-052","qty":3},{"id":"001-042","qty":3},{"id":"001-046","qty":3},{"id":"001-156","qty":3},{"id":"001-220","qty":3},{"id":"001-117","qty":3},{"id":"001-108","qty":3},{"id":"001-136","qty":4},{"id":"001-140","qty":3},{"id":"001-198","qty":3},{"id":"001-150","qty":2},{"id":"001-078","qty":4},{"id":"001-187","qty":4}]},{"title":"Baron of Violence","mode":"Standard","leaderId":"001-002","leaderName":"Baron Valorin","themes":["Navy","Sub","Carrier"],"cards":[{"id":"001-002","qty":1},{"id":"001-166","qty":1},{"id":"001-016","qty":1},{"id":"001-184","qty":1},{"id":"001-226","qty":1},{"id":"001-022","qty":3},{"id":"001-116","qty":4},{"id":"001-112","qty":4},{"id":"001-119","qty":4},{"id":"001-156","qty":4},{"id":"001-063","qty":3},{"id":"001-064","qty":3},{"id":"001-065","qty":3},{"id":"001-217","qty":3},{"id":"001-066","qty":3},{"id":"001-185","qty":4},{"id":"001-224","qty":4},{"id":"001-238","qty":3},{"id":"001-240","qty":4},{"id":"001-080","qty":3},{"id":"001-074","qty":4},{"id":"001-221","qty":4}]},{"title":"The Art of War","mode":"Standard","leaderId":"001-002","leaderName":"Baron Valorin","themes":["Navy","Force"],"cards":[{"id":"001-002","qty":1},{"id":"001-232","qty":1},{"id":"001-233","qty":1},{"id":"001-016","qty":1},{"id":"001-230","qty":1},{"id":"001-064","qty":3},{"id":"001-063","qty":3},{"id":"001-224","qty":3},{"id":"001-223","qty":3},{"id":"001-065","qty":3},{"id":"001-069","qty":3},{"id":"001-217","qty":3},{"id":"001-075","qty":3},{"id":"001-074","qty":3},{"id":"001-078","qty":3},{"id":"001-156","qty":3},{"id":"001-240","qty":3},{"id":"001-027","qty":3},{"id":"001-130","qty":3},{"id":"001-104","qty":3},{"id":"001-116","qty":3},{"id":"001-117","qty":3},{"id":"001-208","qty":3},{"id":"001-199","qty":3},{"id":"001-119","qty":3}]},{"title":"Fear is Your Master","mode":"Standard","leaderId":"001-003","leaderName":"Zain Lion\u00e9","themes":["Army","WMD"],"cards":[{"id":"001-003","qty":1},{"id":"001-227","qty":1},{"id":"001-230","qty":1},{"id":"001-228","qty":1},{"id":"001-175","qty":1},{"id":"001-149","qty":3},{"id":"001-026","qty":3},{"id":"001-129","qty":3},{"id":"001-160","qty":4},{"id":"001-187","qty":4},{"id":"001-150","qty":4},{"id":"001-100","qty":3},{"id":"001-096","qty":3},{"id":"001-044","qty":4},{"id":"001-040","qty":4},{"id":"001-054","qty":3},{"id":"001-081","qty":3},{"id":"001-047","qty":4},{"id":"001-208","qty":3},{"id":"001-189","qty":3},{"id":"001-188","qty":3},{"id":"001-066","qty":3},{"id":"001-113","qty":3}]},{"title":"Ransom Demand","mode":"Standard","leaderId":"001-003","leaderName":"Zain Lion\u00e9","themes":["Force","WMD","Intel"],"cards":[{"id":"001-003","qty":1},{"id":"001-228","qty":1},{"id":"001-227","qty":1},{"id":"001-017","qty":1},{"id":"001-175","qty":1},{"id":"001-189","qty":3},{"id":"001-039","qty":4},{"id":"001-031","qty":4},{"id":"001-048","qty":3},{"id":"001-154","qty":3},{"id":"001-209","qty":3},{"id":"001-155","qty":2},{"id":"001-047","qty":4},{"id":"001-042","qty":4},{"id":"001-052","qty":4},{"id":"001-023","qty":3},{"id":"001-111","qty":3},{"id":"001-100","qty":3},{"id":"001-176","qty":3},{"id":"001-150","qty":3},{"id":"001-129","qty":3},{"id":"001-160","qty":4},{"id":"001-180","qty":4}]},{"title":"Intrigue and Blackmail","mode":"Standard","leaderId":"001-004","leaderName":"President Zeana","themes":["Morale","Intel"],"cards":[{"id":"001-004","qty":1},{"id":"001-011","qty":1},{"id":"001-010","qty":1},{"id":"001-177","qty":1},{"id":"001-219","qty":1},{"id":"001-137","qty":3},{"id":"001-160","qty":4},{"id":"001-207","qty":3},{"id":"001-146","qty":3},{"id":"001-118","qty":4},{"id":"001-206","qty":4},{"id":"001-109","qty":3},{"id":"001-093","qty":4},{"id":"001-096","qty":4},{"id":"001-095","qty":4},{"id":"001-085","qty":3},{"id":"001-121","qty":3},{"id":"001-033","qty":3},{"id":"001-077","qty":3},{"id":"001-200","qty":3},{"id":"001-071","qty":3},{"id":"001-107","qty":3},{"id":"001-113","qty":3}]},{"title":"The Extent of Influence","mode":"Standard","leaderId":"001-004","leaderName":"President Zeana","themes":["Spy","Intel"],"cards":[{"id":"001-004","qty":1},{"id":"001-010","qty":1},{"id":"001-148","qty":1},{"id":"001-017","qty":1},{"id":"001-233","qty":1},{"id":"001-033","qty":3},{"id":"001-031","qty":3},{"id":"001-034","qty":3},{"id":"001-029","qty":3},{"id":"001-049","qty":3},{"id":"001-059","qty":3},{"id":"001-062","qty":3},{"id":"001-071","qty":3},{"id":"001-238","qty":3},{"id":"001-109","qty":3},{"id":"001-141","qty":3},{"id":"001-133","qty":3},{"id":"001-137","qty":3},{"id":"001-190","qty":3},{"id":"001-146","qty":3},{"id":"001-118","qty":3},{"id":"001-113","qty":3},{"id":"001-093","qty":3},{"id":"001-102","qty":3},{"id":"001-179","qty":3}]},{"title":"Pirate's Bay","mode":"Standard","leaderId":"001-005","leaderName":"Thato Lathabo","themes":["Force"],"cards":[{"id":"001-005","qty":1},{"id":"001-226","qty":1},{"id":"001-227","qty":1},{"id":"001-230","qty":1},{"id":"001-166","qty":1},{"id":"001-149","qty":3},{"id":"001-022","qty":3},{"id":"001-160","qty":4},{"id":"001-093","qty":3},{"id":"001-084","qty":3},{"id":"001-098","qty":3},{"id":"001-097","qty":3},{"id":"001-092","qty":3},{"id":"001-119","qty":4},{"id":"001-059","qty":3},{"id":"001-031","qty":3},{"id":"001-039","qty":3},{"id":"001-151","qty":3},{"id":"001-152","qty":4},{"id":"001-153","qty":4},{"id":"001-154","qty":4},{"id":"001-070","qty":4},{"id":"001-186","qty":3}]},{"title":"Seek and Destroy","mode":"Standard","leaderId":"001-005","leaderName":"Thato Lathabo","themes":["Force"],"cards":[{"id":"001-005","qty":1},{"id":"001-228","qty":1},{"id":"001-230","qty":1},{"id":"001-232","qty":1},{"id":"001-016","qty":1},{"id":"001-151","qty":3},{"id":"001-070","qty":3},{"id":"001-152","qty":3},{"id":"001-069","qty":3},{"id":"001-067","qty":3},{"id":"001-052","qty":3},{"id":"001-045","qty":3},{"id":"001-042","qty":3},{"id":"001-048","qty":3},{"id":"001-060","qty":3},{"id":"001-022","qty":3},{"id":"001-126","qty":3},{"id":"001-106","qty":3},{"id":"001-116","qty":3},{"id":"001-117","qty":3},{"id":"001-077","qty":3},{"id":"001-084","qty":3},{"id":"001-119","qty":3},{"id":"001-163","qty":3},{"id":"001-179","qty":3}]},{"title":"Relentless Tech","mode":"Standard","leaderId":"001-006","leaderName":"Premier Zoff","themes":["Force","Drone"],"cards":[{"id":"001-006","qty":1},{"id":"001-009","qty":1},{"id":"001-010","qty":1},{"id":"001-015","qty":1},{"id":"001-219","qty":1},{"id":"001-145","qty":4},{"id":"001-130","qty":3},{"id":"001-068","qty":3},{"id":"001-095","qty":4},{"id":"001-102","qty":4},{"id":"001-094","qty":3},{"id":"001-103","qty":3},{"id":"001-124","qty":3},{"id":"001-241","qty":3},{"id":"001-055","qty":3},{"id":"001-059","qty":3},{"id":"001-029","qty":3},{"id":"001-051","qty":3},{"id":"001-216","qty":3},{"id":"001-041","qty":4},{"id":"001-076","qty":4},{"id":"001-062","qty":4},{"id":"001-140","qty":3}]},{"title":"Strategic Shift","mode":"Standard","leaderId":"001-006","leaderName":"Premier Zoff","themes":["Force","WMD","Intel"],"cards":[{"id":"001-006","qty":1},{"id":"001-237","qty":1},{"id":"001-219","qty":1},{"id":"001-016","qty":1},{"id":"001-233","qty":1},{"id":"001-055","qty":3},{"id":"001-218","qty":3},{"id":"001-216","qty":3},{"id":"001-068","qty":3},{"id":"001-051","qty":3},{"id":"001-076","qty":3},{"id":"001-079","qty":3},{"id":"001-167","qty":3},{"id":"001-085","qty":3},{"id":"001-088","qty":3},{"id":"001-089","qty":3},{"id":"001-094","qty":3},{"id":"001-104","qty":3},{"id":"001-114","qty":3},{"id":"001-106","qty":3},{"id":"001-190","qty":3},{"id":"001-134","qty":3},{"id":"001-137","qty":3},{"id":"001-027","qty":3},{"id":"001-187","qty":3}]},{"title":"Wingman In Position","mode":"Standard","leaderId":"001-007","leaderName":"Queen Awati","themes":["Air","Force"],"cards":[{"id":"001-007","qty":1},{"id":"001-009","qty":1},{"id":"001-147","qty":1},{"id":"001-164","qty":1},{"id":"001-229","qty":1},{"id":"001-196","qty":3},{"id":"001-194","qty":4},{"id":"001-195","qty":4},{"id":"001-192","qty":3},{"id":"001-240","qty":3},{"id":"001-156","qty":3},{"id":"001-088","qty":3},{"id":"001-097","qty":3},{"id":"001-084","qty":3},{"id":"001-125","qty":3},{"id":"001-131","qty":3},{"id":"001-138","qty":3},{"id":"001-105","qty":3},{"id":"001-114","qty":3},{"id":"001-104","qty":3},{"id":"001-071","qty":3},{"id":"001-061","qty":3},{"id":"001-093","qty":3},{"id":"001-199","qty":4}]},{"title":"The Reaper Cometh","mode":"Standard","leaderId":"001-007","leaderName":"Queen Awati","themes":["Air","Soldier"],"cards":[{"id":"001-007","qty":1},{"id":"001-232","qty":1},{"id":"001-147","qty":1},{"id":"001-017","qty":1},{"id":"001-229","qty":1},{"id":"001-197","qty":3},{"id":"001-077","qty":3},{"id":"001-075","qty":3},{"id":"001-193","qty":3},{"id":"001-192","qty":3},{"id":"001-078","qty":3},{"id":"001-081","qty":3},{"id":"001-243","qty":3},{"id":"001-031","qty":3},{"id":"001-046","qty":3},{"id":"001-174","qty":3},{"id":"001-042","qty":3},{"id":"001-198","qty":3},{"id":"001-160","qty":3},{"id":"001-140","qty":3},{"id":"001-105","qty":3},{"id":"001-107","qty":3},{"id":"001-117","qty":3},{"id":"001-150","qty":3},{"id":"001-199","qty":3}]},{"title":"The Way of Stealth","mode":"Standard","leaderId":"001-008","leaderName":"Great Emperor Shang Lee","themes":["Soldier","Ninja","Intel"],"cards":[{"id":"001-008","qty":1},{"id":"001-013","qty":1},{"id":"001-017","qty":1},{"id":"001-173","qty":1},{"id":"001-177","qty":1},{"id":"001-023","qty":4},{"id":"001-111","qty":3},{"id":"001-170","qty":3},{"id":"001-126","qty":3},{"id":"001-131","qty":3},{"id":"001-140","qty":3},{"id":"001-180","qty":4},{"id":"001-093","qty":4},{"id":"001-179","qty":4},{"id":"001-085","qty":3},{"id":"001-169","qty":3},{"id":"001-171","qty":3},{"id":"001-172","qty":3},{"id":"001-174","qty":3},{"id":"001-182","qty":4},{"id":"001-178","qty":3},{"id":"001-183","qty":4},{"id":"001-181","qty":3}]},{"title":"For the Emperor","mode":"Standard","leaderId":"001-008","leaderName":"Great Emperor Shang Lee","themes":["Soldier"],"cards":[{"id":"001-008","qty":1},{"id":"001-173","qty":1},{"id":"001-017","qty":1},{"id":"001-213","qty":1},{"id":"001-233","qty":1},{"id":"001-031","qty":3},{"id":"001-029","qty":3},{"id":"001-169","qty":3},{"id":"001-171","qty":3},{"id":"001-172","qty":3},{"id":"001-178","qty":3},{"id":"001-182","qty":3},{"id":"001-209","qty":3},{"id":"001-239","qty":3},{"id":"001-059","qty":3},{"id":"001-062","qty":3},{"id":"001-132","qty":3},{"id":"001-133","qty":3},{"id":"001-023","qty":3},{"id":"001-111","qty":3},{"id":"001-106","qty":3},{"id":"001-113","qty":3},{"id":"001-206","qty":3},{"id":"001-161","qty":3},{"id":"001-180","qty":3}]},{"title":"Money and Mass Destruction","mode":"Standard","leaderId":"001-203","leaderName":"Governor Key","themes":["Strike","WMD"],"cards":[{"id":"001-203","qty":1},{"id":"001-226","qty":1},{"id":"001-143","qty":1},{"id":"001-229","qty":1},{"id":"001-232","qty":1},{"id":"001-018","qty":3},{"id":"001-024","qty":3},{"id":"001-025","qty":3},{"id":"001-136","qty":4},{"id":"001-160","qty":4},{"id":"001-114","qty":3},{"id":"001-156","qty":4},{"id":"001-153","qty":4},{"id":"001-045","qty":4},{"id":"001-104","qty":4},{"id":"001-107","qty":3},{"id":"001-115","qty":3},{"id":"001-135","qty":4},{"id":"001-167","qty":3},{"id":"001-093","qty":3},{"id":"001-091","qty":4},{"id":"001-121","qty":4}]},{"title":"The Power of Intel","mode":"Standard","leaderId":"001-201","leaderName":"Commander Wilfred Louis","themes":["Intel","Force"],"cards":[{"id":"001-201","qty":1},{"id":"001-237","qty":1},{"id":"001-009","qty":1},{"id":"001-016","qty":1},{"id":"001-012","qty":1},{"id":"001-071","qty":4},{"id":"001-239","qty":3},{"id":"001-062","qty":3},{"id":"001-059","qty":3},{"id":"001-053","qty":3},{"id":"001-041","qty":3},{"id":"001-034","qty":3},{"id":"001-134","qty":3},{"id":"001-190","qty":3},{"id":"001-207","qty":3},{"id":"001-114","qty":3},{"id":"001-094","qty":4},{"id":"001-167","qty":4},{"id":"001-161","qty":3},{"id":"001-142","qty":3},{"id":"001-102","qty":3},{"id":"001-088","qty":3},{"id":"001-083","qty":3},{"id":"001-121","qty":3}]},{"title":"Break Their Encryption","mode":"Standard","leaderId":"001-201","leaderName":"Commander Wilfred Louis","themes":["Intel","Force"],"cards":[{"id":"001-201","qty":1},{"id":"001-010","qty":1},{"id":"001-233","qty":1},{"id":"001-219","qty":1},{"id":"001-011","qty":1},{"id":"001-031","qty":3},{"id":"001-034","qty":3},{"id":"001-049","qty":3},{"id":"001-243","qty":3},{"id":"001-239","qty":3},{"id":"001-042","qty":3},{"id":"001-041","qty":3},{"id":"001-052","qty":3},{"id":"001-059","qty":3},{"id":"001-077","qty":3},{"id":"001-156","qty":3},{"id":"001-134","qty":3},{"id":"001-190","qty":3},{"id":"001-096","qty":3},{"id":"001-097","qty":3},{"id":"001-094","qty":3},{"id":"001-206","qty":3},{"id":"001-179","qty":3},{"id":"001-161","qty":3},{"id":"001-120","qty":3}]},{"title":"Anyone and No One","mode":"Standard","leaderId":"001-202","leaderName":"Victor, the Anonymous","themes":["Force","Intel","Morale"],"cards":[{"id":"001-202","qty":1},{"id":"001-164","qty":1},{"id":"001-219","qty":1},{"id":"001-147","qty":1},{"id":"001-177","qty":1},{"id":"001-217","qty":3},{"id":"001-185","qty":3},{"id":"001-074","qty":3},{"id":"001-069","qty":3},{"id":"001-052","qty":3},{"id":"001-054","qty":3},{"id":"001-039","qty":3},{"id":"001-042","qty":3},{"id":"001-154","qty":3},{"id":"001-022","qty":3},{"id":"001-084","qty":3},{"id":"001-091","qty":3},{"id":"001-096","qty":3},{"id":"001-108","qty":3},{"id":"001-116","qty":3},{"id":"001-117","qty":3},{"id":"001-179","qty":3},{"id":"001-128","qty":3},{"id":"001-077","qty":3},{"id":"001-122","qty":3}]},{"title":"Underground Network","mode":"Standard","leaderId":"001-202","leaderName":"Victor, the Anonymous","themes":["Intel"],"cards":[{"id":"001-202","qty":1},{"id":"001-164","qty":1},{"id":"001-015","qty":1},{"id":"001-233","qty":1},{"id":"001-227","qty":1},{"id":"001-071","qty":3},{"id":"001-073","qty":3},{"id":"001-059","qty":3},{"id":"001-061","qty":3},{"id":"001-238","qty":3},{"id":"001-031","qty":3},{"id":"001-034","qty":3},{"id":"001-041","qty":3},{"id":"001-149","qty":3},{"id":"001-134","qty":3},{"id":"001-190","qty":3},{"id":"001-083","qty":3},{"id":"001-088","qty":3},{"id":"001-097","qty":3},{"id":"001-093","qty":3},{"id":"001-161","qty":3},{"id":"001-206","qty":3},{"id":"001-146","qty":3},{"id":"001-114","qty":3},{"id":"001-124","qty":3}]},{"title":"The Wolfpack","mode":"Standard","leaderId":"001-204","leaderName":"Admiral Bancroft","themes":["Force","WMD","Navy","Sub"],"cards":[{"id":"001-204","qty":1},{"id":"001-235","qty":1},{"id":"001-234","qty":1},{"id":"001-184","qty":1},{"id":"001-177","qty":1},{"id":"001-070","qty":4},{"id":"001-185","qty":4},{"id":"001-071","qty":4},{"id":"001-069","qty":4},{"id":"001-186","qty":4},{"id":"001-240","qty":3},{"id":"001-059","qty":3},{"id":"001-042","qty":3},{"id":"001-041","qty":3},{"id":"001-022","qty":3},{"id":"001-027","qty":3},{"id":"001-126","qty":3},{"id":"001-131","qty":3},{"id":"001-137","qty":3},{"id":"001-106","qty":3},{"id":"001-116","qty":3},{"id":"001-115","qty":3},{"id":"001-119","qty":4}]},{"title":"Judge, Jury, and Executioner","mode":"Standard","leaderId":"001-204","leaderName":"Admiral Bancroft","themes":["Navy"],"cards":[{"id":"001-204","qty":1},{"id":"001-235","qty":1},{"id":"001-010","qty":1},{"id":"001-016","qty":1},{"id":"001-228","qty":1},{"id":"001-070","qty":3},{"id":"001-069","qty":3},{"id":"001-071","qty":3},{"id":"001-185","qty":3},{"id":"001-072","qty":3},{"id":"001-224","qty":3},{"id":"001-063","qty":3},{"id":"001-221","qty":3},{"id":"001-075","qty":3},{"id":"001-073","qty":3},{"id":"001-022","qty":3},{"id":"001-131","qty":3},{"id":"001-160","qty":3},{"id":"001-117","qty":3},{"id":"001-085","qty":3},{"id":"001-097","qty":3},{"id":"001-093","qty":3},{"id":"001-088","qty":3},{"id":"001-098","qty":3},{"id":"001-119","qty":3}]},{"title":"The Wildcard","mode":"Standard","leaderId":"001-205","leaderName":"Riku Ito, Ace","themes":["Air"],"cards":[{"id":"001-205","qty":1},{"id":"001-232","qty":1},{"id":"001-158","qty":1},{"id":"001-147","qty":1},{"id":"001-012","qty":1},{"id":"001-222","qty":4},{"id":"001-217","qty":4},{"id":"001-077","qty":4},{"id":"001-075","qty":4},{"id":"001-156","qty":4},{"id":"001-193","qty":3},{"id":"001-192","qty":3},{"id":"001-019","qty":3},{"id":"001-125","qty":3},{"id":"001-131","qty":3},{"id":"001-160","qty":3},{"id":"001-117","qty":3},{"id":"001-106","qty":3},{"id":"001-093","qty":3},{"id":"001-097","qty":3},{"id":"001-103","qty":3},{"id":"001-123","qty":3},{"id":"001-199","qty":4}]},{"title":"An Ace In the Hole","mode":"Standard","leaderId":"001-205","leaderName":"Riku Ito, Ace","themes":["Force","Air","Navy"],"cards":[{"id":"001-205","qty":1},{"id":"001-232","qty":1},{"id":"001-014","qty":1},{"id":"001-225","qty":1},{"id":"001-229","qty":1},{"id":"001-064","qty":3},{"id":"001-063","qty":3},{"id":"001-188","qty":3},{"id":"001-196","qty":4},{"id":"001-195","qty":4},{"id":"001-194","qty":4},{"id":"001-192","qty":3},{"id":"001-074","qty":3},{"id":"001-075","qty":3},{"id":"001-217","qty":3},{"id":"001-156","qty":3},{"id":"001-052","qty":3},{"id":"001-041","qty":3},{"id":"001-042","qty":3},{"id":"001-104","qty":3},{"id":"001-117","qty":3},{"id":"001-137","qty":3},{"id":"001-121","qty":3},{"id":"001-199","qty":3}]}];

// Build a lookup from id -> enriched record
const ENRICHED_BY_ID = Object.fromEntries(ENRICHED.map(e => [e.id, e]));

function getCard(id) {
const base = CARDS.find(c => c.id === id);
if (!base) return null;
const enriched = ENRICHED_BY_ID[id];
return enriched ? { ...base, ...enriched, hasFullData: true } : { ...base, hasFullData: false };
}

// ============================================================================
// AI DECK BUILDER ENGINE V2 — Recipe-First with Filter Resolution
// ============================================================================

// Get all leaders that have at least one official recipe.
function getRecipeLeaders() {
const leaderIds = new Set();
for (const r of RECIPES) {
if (r.leaderId) leaderIds.add(r.leaderId);
}
return Array.from(leaderIds)
.map(id => getCard(id))
.filter(c => c !== null)
.sort((a, b) => (a.cardid || '').localeCompare(b.cardid || ''));
}

// Get recipes available for a given leader id
function getRecipesForLeader(leaderId) {
return RECIPES.filter(r => r.leaderId === leaderId);
}

// Resolve a recipe into a concrete deck.
// For “filter” entries (no specific cid), pick from the card pool by type/subtype.
function resolveRecipe(recipe) {
const deck = {};
const choices = []; // explanations for each slot
const usedIds = new Set();

// First pass: fixed cid entries
for (const slot of recipe.cards) {
if (slot.id) {
const card = getCard(slot.id);
if (!card) continue;
const qty = slot.qty || 1;
deck[slot.id] = (deck[slot.id] || 0) + qty;
usedIds.add(slot.id);
choices.push({ slot, picked: card, qty, kind: 'fixed' });
}
}

// Second pass: filter entries — pick best match
for (const slot of recipe.cards) {
if (slot.id) continue;
if (!slot.filter) continue;

const qty = slot.qty || 1;
const candidates = CARDS.filter(c => {
  if (slot.filter.type && c.type !== slot.filter.type) return false;
  // Subtype filtering: we don't have subtype on base data, but enriched cards do
  const enriched = ENRICHED_BY_ID[c.id];
  if (slot.filter.subtype1) {
    const sub = enriched?.subtype || '';
    if (!sub.toUpperCase().includes(slot.filter.subtype1.toUpperCase())) return false;
  }
  if (slot.filter.subtype2) {
    const sub = enriched?.subtype || '';
    if (!sub.toUpperCase().includes(slot.filter.subtype2.toUpperCase())) return false;
  }
  // For Territory uniqueness: each territory slot must be a different card
  if (slot.filter.type === 'Territory' && usedIds.has(c.id)) return false;
  return true;
});

// Score candidates: prefer enriched (we have data for them) then by id (stable)
candidates.sort((a, b) => {
  const aE = !!ENRICHED_BY_ID[a.id];
  const bE = !!ENRICHED_BY_ID[b.id];
  if (aE && !bE) return -1;
  if (!aE && bE) return 1;
  return a.id.localeCompare(b.id);
});

if (candidates.length > 0) {
  const picked = candidates[0];
  deck[picked.id] = (deck[picked.id] || 0) + qty;
  usedIds.add(picked.id);
  choices.push({ slot, picked: getCard(picked.id), qty, kind: 'filter' });
} else {
  choices.push({ slot, picked: null, qty, kind: 'unfilled' });
}

}

// Statistics
const entries = Object.entries(deck).map(([id, n]) => ({ card: getCard(id), n })).filter(x => x.card);
const total = entries.reduce((s, e) => s + e.n, 0);
const byType = {};
for (const e of entries) byType[e.card.type] = (byType[e.card.type] || 0) + e.n;

// Cost curve from enriched cards only
const costCurve = {};
for (const e of entries) {
if (typeof e.card.cost === 'number') {
costCurve[e.card.cost] = (costCurve[e.card.cost] || 0) + e.n;
}
}

// Resource histogram from enriched cards
const resourceCounts = { G: 0, F: 0, P: 0, Fu: 0, M: 0 };
for (const e of entries) {
if (!e.card.costIcons) continue;
for (const r of e.card.costIcons) {
if (r && r.includes('|')) {
for (const opt of r.split('|')) {
if (resourceCounts[opt] !== undefined) resourceCounts[opt] += e.n * 0.5;
}
} else if (resourceCounts[r] !== undefined) {
resourceCounts[r] += e.n;
}
}
}

return { deck, choices, entries, total, byType, costCurve, resourceCounts };
}

// ============================================================================
// AI ENGINE V2 — Visible reasoning + novel deck composition
// ============================================================================

// Score a candidate card for inclusion in a deck context, returning an array of
// human-readable reasons. This is what makes the AI “special”: every pick is
// explainable.
function scoreCardInContext(card, ctx) {
// ctx: { leader, themes (set of theme strings), keywordsInDeck (Counter), subtypesInDeck (Counter) }
const reasons = [];
let score = 10; // baseline

if (!card) return { score: 0, reasons: [] };

// Theme alignment via subtype keywords
const sub = (card.subtype || '').toUpperCase();
for (const theme of ctx.themes) {
if (sub.includes(theme.toUpperCase())) {
score += 12;
reasons.push({ pts: 12, why: `matches deck theme: ${theme}` });
break;
}
}

// Keyword synergy with existing deck
const cardKws = (card.keywords || []);
let kwBonus = 0;
const matchedKws = [];
for (const kw of cardKws) {
const have = ctx.keywordsInDeck[kw] || 0;
if (have >= 4) {
kwBonus += 6;
matchedKws.push(kw);
} else if (have >= 1) {
kwBonus += 3;
}
}
if (kwBonus > 0) {
score += kwBonus;
reasons.push({ pts: kwBonus, why: matchedKws.length ? `stacks with ${matchedKws.join(', ')} already in deck` : `extends keyword presence` });
}

// Self-stacked synergy: cards with multiple keywords are inherently better
if (cardKws.length >= 3) {
score += 5;
reasons.push({ pts: 5, why: `${cardKws.length} keywords on one card (high density)` });
} else if (cardKws.length >= 2) {
score += 2;
reasons.push({ pts: 2, why: `${cardKws.length} keywords (multi-tool)` });
}

// Documented synergy pairs from our edge graph
for (let i = 0; i < cardKws.length; i++) {
for (let j = i+1; j < cardKws.length; j++) {
const ku = cardKws[i].toUpperCase(), kv = cardKws[j].toUpperCase();
const hasSyn = SYN.edges.some(e => e[2] !== 'counters' &&
((e[0].toUpperCase()===ku && e[1].toUpperCase()===kv) || (e[0].toUpperCase()===kv && e[1].toUpperCase()===ku)));
if (hasSyn) {
score += 4;
reasons.push({ pts: 4, why: `${cardKws[i]}+${cardKws[j]} documented synergy` });
break;
}
}
}

// Cost efficiency
if (typeof card.cost === 'number') {
if (card.cost === 0) { score += 4; reasons.push({ pts: 4, why: 'cost-0 -- playable turn 1' }); }
else if (card.cost === 1) { score += 2; reasons.push({ pts: 2, why: 'cost-1 -- early curve' }); }
else if (card.cost >= 3) { score -= 3; reasons.push({ pts: -3, why: `cost-${card.cost} — slow` }); }
}

// Stat efficiency for forces
if (card.type === 'Force' && typeof card.atk === 'number' && typeof card.hp === 'number') {
const eff = (card.atk + card.hp);
if (eff >= 200) { score += 5; reasons.push({ pts: 5, why: `${eff} total stats (high impact)` }); }
else if (eff >= 100) { score += 2; reasons.push({ pts: 2, why: `${eff} total stats (solid)` }); }
}

// Leader-trigger affinity (uses leader’s ability text to find words appearing on card)
if (ctx.leader?.abilities) {
const leaderText = ctx.leader.abilities.map(a => `${a.name||''} ${a.text||''}`).join(' ').toLowerCase();
const cardName = (card.name || '').toLowerCase();
const cardSub = (card.subtype || '').toLowerCase();
// If leader text references this card’s subtype or name parts
const subWords = cardSub.split(/[\s:,]+/).filter(w => w.length > 3);
for (const w of subWords) {
if (leaderText.includes(w)) {
score += 6;
reasons.push({ pts: 6, why: `your leader's ability references "${w}"` });
break;
}
}
}

return { score, reasons };
}

// NOVEL DECK COMPOSER — doesn’t copy recipes, builds from theme + leader using
// the synergy graph. Returns deck + per-card reasoning trace.
function composeNovelDeck(leaderId, primaryThemes = []) {
const leader = getCard(leaderId);
if (!leader || !leader.hasFullData) return null;

// Auto-detect themes from leader text if none provided
const themes = new Set(primaryThemes);
if (themes.size === 0) {
const text = (leader.abilities || []).map(a => `${a.name||''} ${a.text||''}`).join(' ').toLowerCase();
if (text.includes('drone')) themes.add('Drone');
if (text.includes('soldier')) themes.add('Soldier');
if (text.includes('wmd') || text.includes('nuclear') || text.includes('detonation')) themes.add('WMD');
if (text.includes('tank') || text.includes('mech')) themes.add('Tank');
if (text.includes('territory') || text.includes('repair') || text.includes('restoration')) themes.add('Territory');
if (text.includes('intel') || text.includes('unveil')) themes.add('Intel');
if (text.includes('infect')) themes.add('Infected');
}
if (themes.size === 0) themes.add('Force');

const ctx = {
leader,
themes,
keywordsInDeck: { },
subtypesInDeck: { },
};

const trace = []; // per-card reasoning

// Score every enriched non-leader card
const scored = ENRICHED
.filter(e => e.id !== leaderId)
.map(e => {
const c = getCard(e.id);
const { score, reasons } = scoreCardInContext(c, ctx);
return { card: c, score, reasons };
})
.filter(s => s.card)
.sort((a, b) => b.score - a.score);

// Pick 4 unique territories first (highest scored)
const tCandidates = scored.filter(s => s.card.type === 'Territory');
const territories = tCandidates.slice(0, 4);

// Pick 60 arsenal cards (any non-Leader, non-Territory)
const arsenalCandidates = scored.filter(s => s.card.type !== 'Territory' && s.card.type !== 'Leader');
const arsenal = {};
let arsenalCount = 0;
for (const ac of arsenalCandidates) {
if (arsenalCount >= 60) break;
const remaining = 60 - arsenalCount;
const copies = Math.min(4, remaining);
arsenal[ac.card.id] = copies;
arsenalCount += copies;
trace.push({ card: ac.card, copies, score: ac.score, reasons: ac.reasons });
// Update context as we add cards (running tally for synergy with future picks)
for (const k of (ac.card.keywords || [])) {
ctx.keywordsInDeck[k] = (ctx.keywordsInDeck[k] || 0) + copies;
}
}

const deck = { [leaderId]: 1 };
for (const t of territories) {
deck[t.card.id] = 1;
trace.unshift({ card: t.card, copies: 1, score: t.score, reasons: t.reasons });
}
for (const [id, n] of Object.entries(arsenal)) deck[id] = n;

// Compute aggregate keyword counts
const keywordCounts = {};
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (!c?.keywords) continue;
for (const k of c.keywords) keywordCounts[k] = (keywordCounts[k] || 0) + n;
}

// Cost curve
const costCurve = {};
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (typeof c?.cost === 'number') costCurve[c.cost] = (costCurve[c.cost] || 0) + n;
}

// Identify weaknesses honestly
const weaknesses = [];
if (!keywordCounts['ANTI-AIR']) weaknesses.push('No ANTI-AIR -- vulnerable to air forces and bombers.');
if (!keywordCounts['STEALTH'] && !keywordCounts['EVADE']) weaknesses.push('No STEALTH or EVADE -- every force is blockable.');
if ((costCurve[0] || 0) + (costCurve[1] || 0) < 25) weaknesses.push('Light early game -- few cost-0/1 cards.');
const totalForces = Object.entries(deck).filter(([id]) => getCard(id)?.type === 'Force').reduce((s,[id,n])=>s+n,0);
if (totalForces < 20) weaknesses.push(`Only ${totalForces} forces — may struggle to hold the war zone.`);

return {
leader, themes: Array.from(themes), deck, trace,
keywordCounts, costCurve, weaknesses,
totalCards: Object.values(deck).reduce((s,n)=>s+n,0),
};
}

// ============================================================================
// AI ENGINE V3 — COUNTER-META BUILDER
// Adversarial deckbuilder. Predicts a target leader's likely build from their
// recipes and a Novel composition, then scores every candidate card with a
// blend of own-synergy (your leader) and counter-value against the target's
// threat profile. Uses three counter vectors:
//   (A) Explicit `counters` edges from SYN (asymmetric)
//   (B) Type-triangle: ANTI-AIR / ANTI-GROUND / ANTI-NAVAL vs target's Force mix
//   (C) Light archetype heuristic from the target leader's ability text
// Returns full reasoning + a threat-coverage matrix for the result view.
// ============================================================================

// Predict the target leader's likely deck composition by aggregating their
// official recipes (weight 1.0 per copy) plus a Novel composition (weight 0.5).
function predictThreatProfile(targetLeaderId) {
const target = getCard(targetLeaderId);
if (!target) return null;

const cardWeights = {};

// Recipes (canonical, full weight)
for (const recipe of getRecipesForLeader(targetLeaderId)) {
const resolved = resolveRecipe(recipe);
for (const [id, n] of Object.entries(resolved.deck)) {
cardWeights[id] = (cardWeights[id] || 0) + n;
}
}

// Novel composition (inferred, half weight). Only works for enriched leaders.
const novel = composeNovelDeck(targetLeaderId);
if (novel?.deck) {
for (const [id, n] of Object.entries(novel.deck)) {
cardWeights[id] = (cardWeights[id] || 0) + n * 0.5;
}
}

// Aggregate keywords / force types / resource mix from the predicted cards
const keywords = {};
const forceTypes = { Ground: 0, Air: 0, Navy: 0 };
const resourceMix = { G: 0, F: 0, P: 0, Fu: 0, M: 0 };
let enrichedWeight = 0;
let totalWeight = 0;

for (const [id, weight] of Object.entries(cardWeights)) {
const c = getCard(id);
if (!c) continue;
totalWeight += weight;
if (c.hasFullData) enrichedWeight += weight;

for (const kw of (c.keywords || [])) {
keywords[kw] = (keywords[kw] || 0) + weight;
}

if (c.type === 'Force') {
const sub = (c.subtype || '').toUpperCase();
if (sub.startsWith('AIR')) forceTypes.Air += weight;
else if (sub.startsWith('NAVY') || sub.startsWith('SUB')) forceTypes.Navy += weight;
else if (sub.startsWith('SOLDIER') || sub.startsWith('ARMY') || sub.startsWith('DRONE') || sub.startsWith('MECH') || sub.startsWith('TANK')) forceTypes.Ground += weight;
}

if (c.type === 'Territory' && Array.isArray(c.produces)) {
for (const r of c.produces) {
if (resourceMix[r] !== undefined) resourceMix[r] += weight;
}
}
}

const confidence = totalWeight > 0 ? enrichedWeight / totalWeight : 0;

// Archetype heuristic from leader ability text — only fires if leader is enriched
const leaderText = (target.abilities || []).map(a => `${a.name||''} ${a.text||''}`).join(' ').toLowerCase();
let archetype = 'unknown';
if (target.hasFullData && leaderText.length > 0) {
const intelHits = (leaderText.match(/intel/g) || []).length;
const drawHits = (leaderText.match(/draw|cycle|search/g) || []).length;
const damageHits = (leaderText.match(/damage|eliminate|destroy|nuclear|wmd|detonation|strike/g) || []).length;
const resourceHits = (leaderText.match(/per turn|produce|generic|fuel|power|equipment|food/g) || []).length;
const scores = {
control: intelHits * 2 + drawHits,
ramp: resourceHits * 2,
aggro: damageHits * 2,
tempo: drawHits + intelHits,
};
const top = Object.entries(scores).sort((a,b) => b[1]-a[1])[0];
if (top && top[1] >= 2) archetype = top[0];
}

return { target, cards: cardWeights, keywords, forceTypes, resourceMix, archetype, leaderText, confidence };
}

// Score a candidate card's counter value against a threat profile.
// Returns an explainable score with per-bucket reasoning (edge / triangle / strategic).
const STRATEGIC_COUNTERS = {
control: ['LOCKOUT', 'STUN', 'SUBVERT', 'CYCLE', 'DISABLED'],
ramp:    ['TAX', 'SHUT OFF', 'WORK STOP', 'SUSPEND', 'MELTDOWN', 'RUIN', 'NUCLEAR DETONATION'],
aggro:   ['GUARD', 'PROTECT', 'HEAL', 'RESTORE', 'RESTORATION', 'ARMORED'],
tempo:   ['LOCKOUT', 'SUBVERT', 'PILFER', 'STUN'],
};

function scoreCardCounterValue(card, threat) {
if (!card || !threat) return { score: 0, reasons: [] };
const cardKws = card.keywords || [];
if (cardKws.length === 0) return { score: 0, reasons: [] };

const reasons = [];
let score = 0;

// (A) Explicit edge counters — asymmetric, so only count edges where OUR keyword
// is the counterer (edge[0]) and THEIR keyword is the countered (edge[1]).
for (const ourKw of cardKws) {
for (const edge of getEdgesFor(ourKw, 'counters')) {
if (edge[0] !== ourKw) continue;
const theirKw = edge[1];
const theirWeight = threat.keywords[theirKw] || 0;
if (theirWeight > 0) {
const pts = Math.min(8 * (theirWeight / 4), 24);
score += pts;
reasons.push({ pts: Math.round(pts), type: 'edge', ourKw, theirKw, why: `${ourKw} counters ${theirKw} (${theirWeight.toFixed(1)} weight in target)` });
}
}
}

// (B) Type-triangle counters — Force-type denial via ANTI-X keywords.
const triangle = [
{ kw: 'ANTI-AIR',     type: 'Air',    threshold: 4 },
{ kw: 'ANTI-GROUND',  type: 'Ground', threshold: 4 },
{ kw: 'ANTI-NAVAL',   type: 'Navy',   threshold: 4 },
];
for (const t of triangle) {
if (cardKws.includes(t.kw) && threat.forceTypes[t.type] >= t.threshold) {
const pts = Math.min(5 + threat.forceTypes[t.type] / 6, 12);
score += pts;
reasons.push({ pts: Math.round(pts), type: 'triangle', ourKw: t.kw, theirType: t.type, why: `${t.kw} vs ${threat.forceTypes[t.type].toFixed(0)} ${t.type.toLowerCase()} forces in target` });
}
}

// (C) Strategic / archetype counters — small bonus only when archetype is confident.
if (threat.archetype !== 'unknown') {
const counterKws = STRATEGIC_COUNTERS[threat.archetype] || [];
const seen = new Set();
for (const ck of counterKws) {
if (cardKws.includes(ck) && !seen.has(ck)) {
seen.add(ck);
score += 4;
reasons.push({ pts: 4, type: 'strategic', ourKw: ck, archetype: threat.archetype, why: `${ck} disrupts ${threat.archetype} archetype` });
}
}
}

return { score, reasons };
}

// Build a 65-card deck for `yourLeaderId` optimized to counter `targetLeaderId`.
// Score blend: 0.35 × own-synergy + 0.65 × counter-value (counter-biased but
// keeps decks coherent rather than producing a pile of disjoint counters).
function composeCounterDeck(yourLeaderId, targetLeaderId) {
const yourLeader = getCard(yourLeaderId);
if (!yourLeader || !yourLeader.hasFullData) return null;

const threat = predictThreatProfile(targetLeaderId);
if (!threat) return null;

// Auto-detect themes for OUR leader (mirrors composeNovelDeck logic)
const themes = new Set();
const yourText = (yourLeader.abilities || []).map(a => `${a.name||''} ${a.text||''}`).join(' ').toLowerCase();
if (yourText.includes('drone')) themes.add('Drone');
if (yourText.includes('soldier')) themes.add('Soldier');
if (yourText.includes('wmd') || yourText.includes('nuclear') || yourText.includes('detonation')) themes.add('WMD');
if (yourText.includes('tank') || yourText.includes('mech')) themes.add('Tank');
if (yourText.includes('territory') || yourText.includes('repair') || yourText.includes('restoration')) themes.add('Territory');
if (yourText.includes('intel') || yourText.includes('unveil')) themes.add('Intel');
if (yourText.includes('infect')) themes.add('Infected');
if (themes.size === 0) themes.add('Force');

const ctx = { leader: yourLeader, themes, keywordsInDeck: {}, subtypesInDeck: {} };
const trace = [];

// Score every enriched non-leader candidate with combined own + counter score.
const scored = ENRICHED
.filter(e => e.id !== yourLeaderId && e.id !== targetLeaderId)
.map(e => {
const c = getCard(e.id);
const ownEval = scoreCardInContext(c, ctx);
const counterEval = scoreCardCounterValue(c, threat);
const combined = 0.35 * ownEval.score + 0.65 * counterEval.score;
return {
card: c,
score: combined,
ownScore: ownEval.score,
counterScore: counterEval.score,
ownReasons: ownEval.reasons,
counterReasons: counterEval.reasons,
};
})
.filter(s => s.card)
.sort((a, b) => b.score - a.score);

// Pick 4 unique territories first
const tCandidates = scored.filter(s => s.card.type === 'Territory');
const territories = tCandidates.slice(0, 4);

// Pick 60 arsenal cards (max 4 copies each)
const arsenalCandidates = scored.filter(s => s.card.type !== 'Territory' && s.card.type !== 'Leader');
const arsenal = {};
let arsenalCount = 0;
for (const ac of arsenalCandidates) {
if (arsenalCount >= 60) break;
const remaining = 60 - arsenalCount;
const copies = Math.min(4, remaining);
arsenal[ac.card.id] = copies;
arsenalCount += copies;
trace.push({
card: ac.card, copies,
score: Math.round(ac.score),
ownScore: Math.round(ac.ownScore),
counterScore: Math.round(ac.counterScore),
ownReasons: ac.ownReasons,
counterReasons: ac.counterReasons,
});
for (const k of (ac.card.keywords || [])) {
ctx.keywordsInDeck[k] = (ctx.keywordsInDeck[k] || 0) + copies;
}
}

const deck = { [yourLeaderId]: 1 };
for (const t of territories) {
deck[t.card.id] = 1;
trace.unshift({
card: t.card, copies: 1,
score: Math.round(t.score),
ownScore: Math.round(t.ownScore),
counterScore: Math.round(t.counterScore),
ownReasons: t.ownReasons,
counterReasons: t.counterReasons,
});
}
for (const [id, n] of Object.entries(arsenal)) deck[id] = n;

// Aggregate our deck's keyword counts and cost curve
const keywordCounts = {};
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (!c?.keywords) continue;
for (const k of c.keywords) keywordCounts[k] = (keywordCounts[k] || 0) + n;
}
const costCurve = {};
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (typeof c?.cost === 'number') costCurve[c.cost] = (costCurve[c.cost] || 0) + n;
}

// Threat coverage matrix — for each enemy keyword, which of our cards counter it?
const threatCoverage = {};
for (const [theirKw, theirWeight] of Object.entries(threat.keywords)) {
if (theirWeight <= 0) continue;
const counterCards = [];
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (!c?.keywords) continue;
for (const ourKw of c.keywords) {
const edge = SYN.edges.find(e => e[0] === ourKw && e[1] === theirKw && e[2] === 'counters');
if (edge) {
counterCards.push({ id, name: c.name, copies: n, ourKw });
break;
}
}
}
threatCoverage[theirKw] = {
weight: theirWeight,
counterCards,
counterCount: counterCards.reduce((s,cc) => s + cc.copies, 0),
};
}

// Type-triangle coverage (separate from keyword coverage)
const triangleCoverage = {};
for (const [type, threatCount] of Object.entries(threat.forceTypes)) {
if (threatCount <= 0) continue;
const kw = type === 'Air' ? 'ANTI-AIR' : type === 'Ground' ? 'ANTI-GROUND' : 'ANTI-NAVAL';
triangleCoverage[type] = {
threatCount, counterKw: kw, counterCount: keywordCounts[kw] || 0,
};
}

const totalThreats = Object.keys(threatCoverage).length;
const coveredThreats = Object.values(threatCoverage).filter(t => t.counterCount > 0).length;
const coveragePct = totalThreats > 0 ? coveredThreats / totalThreats : 0;

const weaknesses = [];
const uncovered = Object.entries(threatCoverage)
.filter(([_, t]) => t.counterCount === 0)
.sort((a, b) => b[1].weight - a[1].weight);
if (uncovered.length > 0) {
const top = uncovered.slice(0, 3).map(u => u[0]).join(', ');
weaknesses.push(`${uncovered.length} target keyword${uncovered.length === 1 ? '' : 's'} uncountered: ${top}${uncovered.length > 3 ? '…' : ''}.`);
}
if (threat.confidence < 0.3) {
weaknesses.push(`Low target confidence -- only ${Math.round(threat.confidence*100)}% of the predicted threat deck has full keyword data, so counters are conservative.`);
}
if ((costCurve[0] || 0) + (costCurve[1] || 0) < 25) {
weaknesses.push('Light early game -- few cost-0/1 cards.');
}
const totalForces = Object.entries(deck).filter(([id]) => getCard(id)?.type === 'Force').reduce((s,[id,n])=>s+n,0);
if (totalForces < 20) weaknesses.push(`Only ${totalForces} forces -- may struggle to hold the war zone.`);

return {
leader: yourLeader,
target: threat.target,
threat,
themes: Array.from(themes),
deck,
trace,
keywordCounts,
costCurve,
threatCoverage,
triangleCoverage,
coveragePct,
coveredThreats,
totalThreats,
weaknesses,
totalCards: Object.values(deck).reduce((s,n) => s+n, 0),
};
}

// ============================================================================
// VISUAL CONFIG
// ============================================================================
const SET_NAMES = {
'000': "Volkov's Escape", '001': 'Genesis of Conflict', '002': 'Savage Escalation', '003': 'Shadow Contagion',
};

// Each type has a primary color, a glow, and a gradient used as background tint.
const TYPE_META = {
'Leader':    { Icon: Crown,      color: '#cc2200', glow: 'rgba(253,224,71,0.45)',  grad: 'from-yellow-500/20 via-yellow-500/5 to-transparent' },
'Force':     { Icon: Swords,     color: '#fb923c', glow: 'rgba(251,146,60,0.45)',  grad: 'from-orange-500/20 via-orange-500/5 to-transparent' },
'Territory': { Icon: MapPin,     color: '#86efac', glow: 'rgba(134,239,172,0.4)',  grad: 'from-emerald-500/20 via-emerald-500/5 to-transparent' },
'Building':  { Icon: Building2,  color: '#5eead4', glow: 'rgba(94,234,212,0.4)',   grad: 'from-teal-500/20 via-teal-500/5 to-transparent' },
'WMD':       { Icon: Skull,      color: '#fb7185', glow: 'rgba(251,113,133,0.5)',  grad: 'from-rose-500/25 via-rose-500/5 to-transparent' },
'Intel':     { Icon: Eye,        color: '#7dd3fc', glow: 'rgba(125,211,252,0.4)',  grad: 'from-sky-500/20 via-sky-500/5 to-transparent' },
'Morale':    { Icon: Heart,      color: '#f9a8d4', glow: 'rgba(249,168,212,0.4)',  grad: 'from-pink-500/20 via-pink-500/5 to-transparent' },
'Weather':   { Icon: Cloud,      color: '#cbd5e1', glow: 'rgba(203,213,225,0.3)',  grad: 'from-slate-500/20 via-slate-500/5 to-transparent' },
'G Force':   { Icon: Star,       color: '#c084fc', glow: 'rgba(192,132,252,0.45)', grad: 'from-purple-500/20 via-purple-500/5 to-transparent' },
'Upgrade':   { Icon: Wrench,     color: '#fde68a', glow: 'rgba(253,230,138,0.4)',  grad: 'from-amber-500/20 via-amber-500/5 to-transparent' },
'Resource':  { Icon: Wind,       color: '#a3a3a3', glow: 'rgba(163,163,163,0.3)',  grad: 'from-stone-500/20 via-stone-500/5 to-transparent' },
};

const RARITY_META = {
'Common':     { color: '#9ca3af', glow: 'rgba(156,163,175,0.0)',  ring: 'ring-stone-600' },
'Uncommon':   { color: '#86efac', glow: 'rgba(134,239,172,0.25)', ring: 'ring-emerald-500/40' },
'Super Rare': { color: '#7dd3fc', glow: 'rgba(125,211,252,0.3)',  ring: 'ring-sky-400/50' },
'Heroic':     { color: '#fdba74', glow: 'rgba(253,186,116,0.35)', ring: 'ring-orange-400/60' },
'Unreal':     { color: '#c084fc', glow: 'rgba(192,132,252,0.4)',  ring: 'ring-purple-400/60' },
'One of One': { color: '#fda4af', glow: 'rgba(253,164,175,0.5)',  ring: 'ring-rose-400/70' },
};

// ============================================================================
// TEACH CONTEXT — the win+learn fusion. Any component can summon a keyword or
// rule popover. Used by card detail, deck list, AI reasoning panels, etc.
// ============================================================================
const TeachContext = createContext({ showKeyword: () => {}, showCard: () => {} });
const useTeach = () => useContext(TeachContext);

// Lookup: keyword name (case-insensitive) -> rule entry
const KEYWORD_LOOKUP = (() => {
const m = {};
for (const k of (RULES?.keywords || [])) {
m[k.name.toUpperCase()] = k;
}
return m;
})();

function findKeyword(name) {
if (!name) return null;
return KEYWORD_LOOKUP[name.toUpperCase()] || null;
}

// ============================================================================
// DECK ENGINE — pure functions over a deck (array of card IDs with counts)
// ============================================================================
const cardById = Object.fromEntries(CARDS.map(c => [c.id, c]));

function deckStats(deck) {
// deck = { cardId: count }
const entries = Object.entries(deck).map(([id, n]) => ({ card: cardById[id], n })).filter(x => x.card);
const total = entries.reduce((s, e) => s + e.n, 0);
const byType = {};
for (const e of entries) {
byType[e.card.type] = (byType[e.card.type] || 0) + e.n;
}
return { entries, total, byType };
}

function validateDeck(deck) {
const { entries, total, byType } = deckStats(deck);
const issues = [];
// Total
if (total !== RULES.deckRules.totalCards) {
issues.push({ level: 'error', msg: `Deck must be exactly ${RULES.deckRules.totalCards} cards (currently ${total}).` });
}
// Leaders
const leaders = byType['Leader'] || 0;
if (leaders !== RULES.deckRules.leaders) {
issues.push({ level: 'error', msg: `Deck must contain exactly ${RULES.deckRules.leaders} Leader (currently ${leaders}).` });
}
// Territories — exactly 4 and unique
const territories = entries.filter(e => e.card.type === 'Territory');
const tCount = territories.reduce((s, e) => s + e.n, 0);
if (tCount !== RULES.deckRules.territories) {
issues.push({ level: 'error', msg: `Deck must contain exactly ${RULES.deckRules.territories} Territories (currently ${tCount}).` });
}
for (const t of territories) {
if (t.n > 1) {
issues.push({ level: 'error', msg: `Territories must be unique. "${t.card.name}" appears ${t.n} times.` });
}
}
// Arsenal = total - leader - territories
const arsenalEntries = entries.filter(e => e.card.type !== 'Leader' && e.card.type !== 'Territory');
const arsenalCount = arsenalEntries.reduce((s, e) => s + e.n, 0);
if (arsenalCount !== RULES.deckRules.arsenal) {
issues.push({ level: 'error', msg: `Arsenal must contain exactly ${RULES.deckRules.arsenal} cards (currently ${arsenalCount}).` });
}
// Max 4 copies in arsenal
for (const e of arsenalEntries) {
if (e.n > RULES.deckRules.maxCopies) {
issues.push({ level: 'error', msg: `Max ${RULES.deckRules.maxCopies} copies of any arsenal card. "${e.card.name}" has ${e.n}.` });
}
}
return { issues, valid: issues.length === 0, total, byType, entries };
}

// ============================================================================
// DECK ANALYSIS V2 — archetype detection, synergy density, predicted matchups,
// hypergeometric draw probabilities, mulligan simulator. Mirrors counter-meta
// scoring logic but applies it to the user's own deck.
// ============================================================================

// log(C(n,k)) — logarithmic binomial coefficient, avoids overflow on big decks
function logChoose(n, k) {
if (k < 0 || k > n) return -Infinity;
if (k === 0 || k === n) return 0;
let r = 0;
const lim = Math.min(k, n - k);
for (let i = 1; i <= lim; i++) r += Math.log(n - i + 1) - Math.log(i);
return r;
}

// Hypergeometric: P(exactly k successes in n draws from population N with K successes)
function hypergeomP(N, K, n, k) {
if (k < 0 || k > K || k > n || (n - k) > (N - K)) return 0;
return Math.exp(logChoose(K, k) + logChoose(N - K, n - k) - logChoose(N, n));
}

// P(at least k successes in n draws)
function hypergeomAtLeast(N, K, n, k) {
let p = 0;
const limit = Math.min(K, n);
for (let i = k; i <= limit; i++) p += hypergeomP(N, K, n, i);
return p;
}

// P(see at least k copies of cardId after drawing `draws` cards from the arsenal).
// Arsenal = deck minus leader and territories (those start in play).
function cardDrawProbability(deck, cardId, draws, k = 1) {
let arsenalSize = 0;
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (!c || c.type === 'Leader' || c.type === 'Territory') continue;
arsenalSize += n;
}
const targetCount = deck[cardId] || 0;
if (arsenalSize === 0 || targetCount === 0) return 0;
return hypergeomAtLeast(arsenalSize, targetCount, Math.min(draws, arsenalSize), k);
}

// Fisher-Yates shuffle of the arsenal; returns a stable id-order callers can
// slice for opening-hand + per-turn draws so DRAW +1 reveals the next card
// from the same deck instead of a fresh reshuffle.
function shuffleArsenal(deck) {
const arsenal = [];
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (!c || c.type === 'Leader' || c.type === 'Territory') continue;
for (let i = 0; i < n; i++) arsenal.push(id);
}
for (let i = arsenal.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[arsenal[i], arsenal[j]] = [arsenal[j], arsenal[i]];
}
return arsenal;
}

// Analyze any deck — archetype, themes, synergies, weaknesses, matchups.
// Reverses the Counter-Meta engine: instead of building a deck against a target,
// reads what the deck IS and predicts what it shuts down + struggles with.
// Important: deckStats uses base-only cardById, so we re-resolve via getCard()
// to access enriched fields (keywords, cost, subtype) that drive the analysis.
function analyzeDeck(deck) {
const { entries, total, byType } = deckStats(deck);
if (total === 0) return null;

// Re-resolve every entry through getCard() so we get base + enriched merged.
const richEntries = entries
.map(e => ({ card: getCard(e.card.id), n: e.n }))
.filter(e => e.card);

const leaderEntry = richEntries.find(e => e.card.type === 'Leader');
const leader = leaderEntry?.card || null;

let enrichedCount = 0;
const keywordCounts = {};
for (const e of richEntries) {
if (e.card.hasFullData) enrichedCount += e.n;
for (const kw of (e.card.keywords || [])) {
keywordCounts[kw] = (keywordCounts[kw] || 0) + e.n;
}
}
const enrichmentPct = total > 0 ? enrichedCount / total : 0;

const forceTypes = { Ground: 0, Air: 0, Navy: 0 };
for (const e of richEntries) {
if (e.card.type !== 'Force') continue;
const sub = (e.card.subtype || '').toUpperCase();
if (sub.startsWith('AIR')) forceTypes.Air += e.n;
else if (sub.startsWith('NAVY') || sub.startsWith('SUB')) forceTypes.Navy += e.n;
else if (sub.startsWith('SOLDIER') || sub.startsWith('ARMY') || sub.startsWith('DRONE') || sub.startsWith('MECH') || sub.startsWith('TANK')) forceTypes.Ground += e.n;
}

const costCurve = {};
for (const e of richEntries) {
if (typeof e.card.cost === 'number') costCurve[e.card.cost] = (costCurve[e.card.cost] || 0) + e.n;
}

const subtypeCounts = {};
for (const e of richEntries) {
const subs = (e.card.subtype || '').split(/[:,]/).map(s => s.trim()).filter(Boolean);
for (const s of subs) subtypeCounts[s] = (subtypeCounts[s] || 0) + e.n;
}
const themes = Object.entries(subtypeCounts)
.filter(([, n]) => n >= 4)
.sort((a, b) => b[1] - a[1])
.slice(0, 5)
.map(([t]) => t);

const fastCards = (costCurve[0] || 0) + (costCurve[1] || 0);
const slowCards = Object.entries(costCurve).filter(([c]) => parseInt(c) >= 3).reduce((s, [, n]) => s + n, 0);
const drawKws = ['DRAW A CARD', 'DRAW (X) CARDS', 'DRAW A CARD PER TURN', 'DRAW (X) CARDS PER TURN', 'INSIGHT', 'RECON', 'PILFER', 'EXPERIMENT'];
const removalKws = ['LOCKOUT', 'STUN', 'DISABLED', 'HIJACK', 'PICK-OFF', 'DEAD MAN', 'SUBVERT', 'CULL', 'EXECUTE', 'DEMO', 'RUIN'];
const damageKws = ['BLITZ', 'BEAM', 'CRACK SHOT', 'FINEST', 'HYPERSONIC STRIKE', 'TACTICAL STRIKE', 'NUCLEAR DETONATION', 'AIR RAID'];
const draws = drawKws.reduce((s, k) => s + (keywordCounts[k] || 0), 0);
const removal = removalKws.reduce((s, k) => s + (keywordCounts[k] || 0), 0);
const damage = damageKws.reduce((s, k) => s + (keywordCounts[k] || 0), 0);

const archetypeScores = {
aggro:   (fastCards >= 25 ? 3 : fastCards >= 18 ? 1 : 0) + (damage >= 6 ? 2 : 0),
control: (removal >= 8 ? 3 : removal >= 4 ? 1 : 0) + (slowCards >= 18 ? 1 : 0),
tempo:   (draws >= 6 ? 3 : draws >= 3 ? 1 : 0) + (fastCards >= 20 ? 1 : 0),
ramp:    (slowCards >= 20 ? 3 : slowCards >= 12 ? 1 : 0),
};
const archTop = Object.entries(archetypeScores).sort((a, b) => b[1] - a[1])[0];
const archetype = archTop && archTop[1] >= 2 ? archTop[0] : 'midrange';

// Active synergies: which documented SYN edges fire because both endpoints are in the deck
const activeSynergies = [];
const seenPairs = new Set();
for (const edge of SYN.edges) {
if (edge[2] === 'counters') continue;
const a = keywordCounts[edge[0]] || 0;
const b = keywordCounts[edge[1]] || 0;
if (a === 0 || b === 0) continue;
const key = [edge[0], edge[1]].sort().join('|');
if (seenPairs.has(key)) continue;
seenPairs.add(key);
activeSynergies.push({ pair: [edge[0], edge[1]], aCount: a, bCount: b, count: Math.min(a, b), relation: edge[2] });
}
activeSynergies.sort((a, b) => b.count - a.count);

const weaknesses = [];
if (!keywordCounts['ANTI-AIR']) weaknesses.push('No ANTI-AIR — vulnerable to air forces and bombers.');
if (!keywordCounts['ANTI-GROUND']) weaknesses.push('No ANTI-GROUND — soldier/army swarms hit hard.');
if (!keywordCounts['STEALTH'] && !keywordCounts['EVADE'] && !keywordCounts['COVERT']) {
weaknesses.push('No evasion (STEALTH/EVADE/COVERT) — every force is blockable.');
}
if (fastCards < 22) weaknesses.push(`Light early game — only ${fastCards} cost-0/1 cards.`);
if (removal < 4) weaknesses.push('Thin removal — few answers to enemy threats.');
if (draws < 3) weaknesses.push('Thin card draw — may run out of options.');
const totalForces = byType['Force'] || 0;
if (totalForces < 22) weaknesses.push(`Only ${totalForces} forces — may struggle to hold the war zone.`);
if (enrichmentPct < 0.3) weaknesses.push(`Only ${Math.round(enrichmentPct * 100)}% of cards have full keyword data; analysis is conservative.`);

// Predicted matchups: for each enriched OPPOSING leader with recipes, score how
// well this deck counters their predicted threats. Score = countered keywords / total.
const matchups = [];
const oppLeaders = CARDS.filter(c => c.type === 'Leader' && c.id !== leader?.id);
for (const oppLeader of oppLeaders) {
const recipes = getRecipesForLeader(oppLeader.id);
if (recipes.length === 0) continue;
const oppKws = {};
for (const recipe of recipes) {
const resolved = resolveRecipe(recipe);
for (const [id, n] of Object.entries(resolved.deck)) {
const c = getCard(id);
if (!c?.keywords) continue;
for (const kw of c.keywords) oppKws[kw] = (oppKws[kw] || 0) + n;
}
}
const total = Object.keys(oppKws).length;
if (total === 0) continue;
let countered = 0;
for (const theirKw of Object.keys(oppKws)) {
const countersForThis = SYN.edges.filter(e => e[2] === 'counters' && e[1] === theirKw);
const haveCounter = countersForThis.some(edge => (keywordCounts[edge[0]] || 0) > 0);
if (haveCounter) countered++;
}
matchups.push({ leader: getCard(oppLeader.id), score: countered / total, countered, total });
}
matchups.sort((a, b) => b.score - a.score);

return {
leader, total, byType, themes, archetype, archetypeScores,
keywordCounts, forceTypes, costCurve,
activeSynergies, weaknesses, matchups,
enrichmentPct,
fastCards, slowCards, draws, removal, damage,
};
}

// ============================================================================
// MAIN APP
// ============================================================================
export default function WarsakenCompanion() {
const [tab, setTab] = useState('browse');
const [decks, setDecks] = useState({}); // { id: {name, cards: {cardId: n}, updated} }
const [activeDeckId, setActiveDeckId] = useState(null);
const [storageReady, setStorageReady] = useState(false);
const [share, setShare] = useState(null);
const [commandOpen, setCommandOpen] = useState(false);
const [shareToast, setShareToast] = useState(null);

// Detect a shared deck in the URL hash on first load
useEffect(() => {
const payload = readShareFromHash();
if (payload) setShare(payload);
}, []);

// Cmd/Ctrl+K opens the global command palette
useEffect(() => {
const onKey = (e) => {
const k = e.key?.toLowerCase();
if ((e.metaKey || e.ctrlKey) && k === 'k') {
e.preventDefault();
setCommandOpen((s) => !s);
}
};
window.addEventListener('keydown', onKey);
return () => window.removeEventListener('keydown', onKey);
}, []);

// Load persisted decks on mount
useEffect(() => {
let cancelled = false;
(async () => {
try {
if (typeof window === 'undefined' || !window.storage) {
setStorageReady(true);
return;
}
const meta = await window.storage.get('decks:meta').catch(() => null);
const list = meta?.value ? JSON.parse(meta.value) : { active: null, ids: [] };
const loaded = {};
for (const id of (list.ids || [])) {
try {
const r = await window.storage.get(`decks:item:${id}`);
if (r?.value) loaded[id] = JSON.parse(r.value);
} catch { /* skip missing */ }
}
if (!cancelled) {
setDecks(loaded);
setActiveDeckId(list.active && loaded[list.active] ? list.active : Object.keys(loaded)[0] || null);
setStorageReady(true);
}
} catch {
if (!cancelled) setStorageReady(true);
}
})();
return () => { cancelled = true; };
}, []);

// Helpers passed down to tabs that need to mutate decks
const persistDeck = async (id, deck) => {
if (typeof window === 'undefined' || !window.storage) return;
try {
await window.storage.set(`decks:item:${id}`, JSON.stringify(deck));
const ids = Object.keys({ ...decks, [id]: deck });
await window.storage.set('decks:meta', JSON.stringify({ active: id, ids }));
} catch { /* ignore */ }
};

const removeDeckStorage = async (id) => {
if (typeof window === 'undefined' || !window.storage) return;
try {
await window.storage.delete(`decks:item:${id}`);
const ids = Object.keys(decks).filter(k => k !== id);
const newActive = ids[0] || null;
await window.storage.set('decks:meta', JSON.stringify({ active: newActive, ids }));
} catch { /* ignore */ }
};

const newDeckId = () => `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;

// Switch the active deck and persist the selection so reload reopens the same deck.
const selectActiveDeck = (id) => {
setActiveDeckId(id);
if (typeof window === 'undefined' || !window.storage) return;
const ids = Object.keys(decks);
window.storage.set('decks:meta', JSON.stringify({ active: id, ids })).catch(() => {});
};

const createDeck = (name = 'New Deck', initial = {}) => {
const id = newDeckId();
const d = { id, name, cards: initial, updated: Date.now() };
setDecks(prev => ({ ...prev, [id]: d }));
setActiveDeckId(id);
persistDeck(id, d);
return id;
};

const updateActiveDeck = (mutator) => {
setDecks(prev => {
let id = activeDeckId;
let d = id ? prev[id] : null;
if (!d) {
id = newDeckId();
d = { id, name: 'New Deck', cards: {}, updated: Date.now() };
setActiveDeckId(id);
}
const nextCards = typeof mutator === 'function' ? mutator(d.cards || {}) : mutator;
const updated = { ...d, cards: nextCards, updated: Date.now() };
const next = { ...prev, [id]: updated };
persistDeck(id, updated);
return next;
});
};

const renameDeck = (id, name) => {
setDecks(prev => {
if (!prev[id]) return prev;
const updated = { ...prev[id], name, updated: Date.now() };
const next = { ...prev, [id]: updated };
persistDeck(id, updated);
return next;
});
};

const deleteDeck = (id) => {
setDecks(prev => {
const next = { ...prev };
delete next[id];
removeDeckStorage(id);
if (activeDeckId === id) {
setActiveDeckId(Object.keys(next)[0] || null);
}
return next;
});
};

// Active deck cards (for tabs that just need {cardId: n})
const activeDeck = activeDeckId && decks[activeDeckId] ? decks[activeDeckId].cards : {};
const setActiveDeckCards = (val) => updateActiveDeck(val);

const totalInActive = Object.values(activeDeck).reduce((s, n) => s + n, 0);

// Teach state — globally available popover for keyword/card lookups
const [teachKeyword, setTeachKeyword] = useState(null);
const [teachCardId, setTeachCardId] = useState(null);
const showKeyword = useCallback((kw) => { setTeachCardId(null); setTeachKeyword(kw); }, []);
const showCard = useCallback((id) => { setTeachKeyword(null); setTeachCardId(id); }, []);
const closeTeach = useCallback(() => { setTeachKeyword(null); setTeachCardId(null); }, []);

return (
<TeachContext.Provider value={{ showKeyword, showCard }}>
<div className="text-mil-paper flex flex-col relative" style={{ fontFamily: "'Oswald', Impact, sans-serif", background: '#0d1a0f', minHeight: '100%' }}>
{/* Layered backdrop: deep base + radial glow + subtle grid + vignette */}
<div className="pointer-events-none fixed inset-0 z-0">
<div className="absolute inset-0" style={{
background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(204,34,0,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(251,113,133,0.06) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(125,211,252,0.05) 0%, transparent 50%)'
}} />
<div className="absolute inset-0 opacity-[0.025]" style={{
backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
backgroundSize: '32px 32px',
}} />
<div className="absolute inset-0" style={{
background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
}} />
</div>

  {share && (
    <ShareBanner
      payload={share}
      onImport={() => {
        createDeck(share.name, share.cards);
        setShare(null);
        clearShareHash();
        setTab('deck');
      }}
      onDismiss={() => { setShare(null); clearShareHash(); }}
    />
  )}

  {/* Content area — padded enough to clear the nav bar + iOS home indicator */}
  <div key={tab} className="relative z-10 flex-1" style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))', animation: 'tabFadeIn 200ms ease-out' }}>
    {tab === 'browse' && <BrowseTab deck={activeDeck} setDeck={setActiveDeckCards} />}
    {tab === 'rules' && <RulesTab />}
    {tab === 'deck' && <DeckTab
      deck={activeDeck} setDeck={setActiveDeckCards}
      decks={decks} activeDeckId={activeDeckId} setActiveDeckId={selectActiveDeck}
      createDeck={createDeck} renameDeck={renameDeck} deleteDeck={deleteDeck}
      storageReady={storageReady}
      onShareToast={(msg) => { setShareToast(msg); setTimeout(() => setShareToast(null), 2400); }}
    />}
    {tab === 'ai' && <AITab setDeck={setActiveDeckCards} setTab={setTab} createDeck={createDeck} />}
    {tab === 'syn' && <SynergyTab />}
  </div>

  {/* TAB BAR — glass surface with active glow + iOS safe area at bottom */}
  <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-white/[0.06]" style={{
    background: 'linear-gradient(180deg, rgba(13,26,15,0.92) 0%, rgba(8,15,10,0.99) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    paddingBottom: 'env(safe-area-inset-bottom)',
  }}>
    <div className="grid grid-cols-5">
      <TabButton active={tab==='browse'} onClick={() => setTab('browse')} icon={Library} label="CARDS" sub={`${CARDS.length}`} />
      <TabButton active={tab==='rules'} onClick={() => setTab('rules')} icon={BookOpen} label="RULES" sub={`v${RULES.version}`} />
      <TabButton active={tab==='deck'} onClick={() => setTab('deck')} icon={Layers} label="DECK" sub={`${totalInActive}/65`} />
      <TabButton active={tab==='ai'} onClick={() => setTab('ai')} icon={Sparkles} label="AI" sub="builder" />
      <TabButton active={tab==='syn'} onClick={() => setTab('syn')} icon={Network} label="SYN" sub="combos" />
    </div>
    <div className="flex items-center justify-center gap-3 pb-1 pt-0.5">
      <span className="text-[9px] text-stone-700 tracking-wider">Warsaken® · Eclectic Nerds LLC · Fan app</span>
      <a href="https://discord.gg/warsaken" target="_blank" rel="noopener noreferrer"
        className="text-[9px] text-indigo-400/60 hover:text-indigo-400 tracking-wider transition">
        Join Discord ↗
      </a>
    </div>
  </nav>

  {/* GLOBAL TEACH POPOVER — surfaces rules contextually from anywhere */}
  {teachKeyword && <TeachPopover keyword={teachKeyword} onClose={closeTeach} />}
  {teachCardId && <CardDetail cardId={teachCardId} count={activeDeck[teachCardId] || 0}
    onClose={closeTeach}
    onAdd={() => updateActiveDeck(d => ({ ...d, [teachCardId]: (d[teachCardId]||0)+1 }))}
    onRemove={() => updateActiveDeck(d => { const n = {...d}; if (!n[teachCardId]) return n; n[teachCardId]--; if (n[teachCardId]<=0) delete n[teachCardId]; return n; })}
  />}

  <CommandPalette
    open={commandOpen}
    onClose={() => setCommandOpen(false)}
    cards={CARDS}
    onPick={(id) => { showCard(id); setCommandOpen(false); }}
  />

  <button
    onClick={() => setCommandOpen(true)}
    className="hidden sm:flex fixed top-3 right-3 z-30 items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/80 backdrop-blur border border-mil-green text-mil-stone text-xs hover:border-mil-red/50 hover:text-mil-red transition"
    aria-label="Open command palette"
  >
    <Search className="h-3 w-3" />
    <span>Search</span>
    <kbd className="text-[10px] text-mil-ghost px-1 py-0.5 rounded border border-mil-green">⌘K</kbd>
  </button>

  {shareToast && (
    <div className="fixed bottom-20 inset-x-0 z-40 flex justify-center pointer-events-none">
      <div className="px-4 py-2 rounded-full bg-mil-panel border border-mil-red/30 text-mil-paper text-xs tracking-wider shadow-lg animate-[fadeIn_0.2s_ease-out]">
        {shareToast}
      </div>
    </div>
  )}
</div>
</TeachContext.Provider>

);
}

// Global keyword popover — taught contextually, anywhere a keyword is shown.
function TeachPopover({ keyword, onClose }) {
const k = findKeyword(keyword);
const { showCard, showKeyword } = useTeach();

// Find related keywords (referenced in rules text) and cards using this one
const cardsUsing = useMemo(() => {
if (!keyword) return [];
return Object.entries(SYN.cardKeywords)
.filter(([id, kws]) => kws.map(x => x.toUpperCase()).includes(keyword.toUpperCase()))
.map(([id]) => getCard(id))
.filter(Boolean);
}, [keyword]);

const edges = useMemo(() => {
if (!keyword) return { counters: [], refs: [] };
const ku = keyword.toUpperCase();
const counters = SYN.edges.filter(e => e[2] === 'counters' && (e[0].toUpperCase() === ku || e[1].toUpperCase() === ku));
const refs = SYN.edges.filter(e => e[2] !== 'counters' && (e[0].toUpperCase() === ku || e[1].toUpperCase() === ku));
return { counters, refs };
}, [keyword]);

return (
<div className="fixed inset-0 z-[60]" onClick={onClose}>
<div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} />
<div className="absolute inset-x-0 bottom-0 max-h-[85vh]" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }} onClick={(e) => e.stopPropagation()}>
<div className="relative mx-auto max-w-md p-4 pb-24">
<div className="relative rounded-2xl overflow-hidden border border-mil-red/30" style={{
background: 'linear-gradient(180deg, rgba(13,26,15,0.96) 0%, rgba(8,15,10,0.99) 100%)',
boxShadow: '0 -20px 80px -20px rgba(204,34,0,0.25), 0 0 0 1px rgba(204,34,0,0.1)',
}}>
<div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(204,34,0,0.6), transparent)' }} />
<div className="p-5">
<div className="flex items-start justify-between gap-3 mb-3">
<div className="flex items-center gap-2">
<div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(204,34,0,0.15)', boxShadow: '0 0 24px rgba(204,34,0,0.3)' }}>
<Lightbulb className="h-4 w-4 text-mil-red" />
</div>
<div>
<div className="text-[10px] tracking-[0.2em] text-mil-red/80">// KEYWORD</div>
<div className="text-xl font-bold text-mil-paper leading-tight">{keyword}</div>
</div>
</div>
<button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-mil-muted/40 transition text-mil-fade hover:text-white"><X className="h-4 w-4" /></button>
</div>

          {!k ? (
            <div className="text-sm text-mil-fade">No rule found for this keyword.</div>
          ) : (
            <>
              {k.text && (
                <div className="text-base text-mil-paper leading-relaxed mb-3 font-medium">{k.text}</div>
              )}
              {k.detail && (
                <div className="text-xs text-mil-fade leading-relaxed mb-4 pb-4 border-b border-white/5">{k.detail}</div>
              )}

              {edges.counters.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] tracking-wider text-rose-300/80 mb-1.5">COUNTERED BY / COUNTERS</div>
                  <div className="flex flex-wrap gap-1.5">
                    {edges.counters.map((e, i) => {
                      const other = e[0].toUpperCase() === keyword.toUpperCase() ? e[1] : e[0];
                      return (
                        <button key={i} onClick={() => showKeyword(other)} className="text-[11px] px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-200 hover:bg-rose-500/20 transition">
                          {other}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {edges.refs.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] tracking-wider text-mil-fade mb-1.5">RELATED RULES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {edges.refs.slice(0, 8).map((e, i) => {
                      const other = e[0].toUpperCase() === keyword.toUpperCase() ? e[1] : e[0];
                      return (
                        <button key={i} onClick={() => showKeyword(other)} className="text-[11px] px-2 py-1 rounded-md bg-mil-muted/30 border border-white/10 text-mil-stone hover:bg-mil-muted/40 transition">
                          {other}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {cardsUsing.length > 0 && (
                <div>
                  <div className="text-[10px] tracking-wider text-mil-fade mb-1.5">CARDS USING THIS ({cardsUsing.length})</div>
                  <div className="space-y-1">
                    {cardsUsing.slice(0, 6).map(c => (
                      <button key={c.id} onClick={() => showCard(c.id)} className="w-full text-left flex items-center gap-2 text-xs hover:text-mil-red transition py-0.5">
                        <span className="text-mil-stone truncate flex-1">{c.name}</span>
                        <span className="text-mil-ghost/70 text-[10px]">{c.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

);
}

function TabButton({ active, onClick, icon: Icon, label, sub }) {
return (
<button onClick={onClick} className={`relative flex flex-col items-center justify-center py-2.5 transition-all ${active ? 'text-mil-red' : 'text-mil-ghost hover:text-mil-stone'}`}>
{active && (
<span className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #cc2200, transparent)', boxShadow: '0 0 8px rgba(204,34,0,0.6)' }} />
)}
<Icon className={`h-4 w-4 transition-transform ${active ? 'scale-110' : ''}`} style={active ? { filter: 'drop-shadow(0 0 6px rgba(204,34,0,0.5))' } : {}} />
<span className="text-[10px] tracking-wider mt-0.5 font-bold">{label}</span>
<span className={`text-[9px] ${active ? 'text-mil-red/70' : 'text-mil-ghost/70'}`}>{sub}</span>
</button>
);
}

// ============================================================================
// BROWSE TAB
// ============================================================================
function BrowseTab({ deck, setDeck }) {
const [query, setQuery] = useState('');
const [filterType, setFilterType] = useState('All');
const [filterSet, setFilterSet] = useState('All');
const [filterRarity, setFilterRarity] = useState('All');
const [bannerDismissed, setBannerDismissed] = useState(() => {
  try { return !!localStorage.getItem('wsk_banner_v1'); } catch { return false; }
});
const [showFilters, setShowFilters] = useState(false);
const [selectedCard, setSelectedCard] = useState(null);

const types = useMemo(() => ['All', ...[...new Set(CARDS.map(c => c.type))].sort()], []);
const sets = useMemo(() => ['All', ...[...new Set(CARDS.map(c => c.setid))].sort()], []);
const rarities = ['All', 'Common', 'Uncommon', 'Super Rare', 'Heroic', 'Unreal', 'One of One'];

const filtered = useMemo(() => {
const q = query.trim().toLowerCase();
return CARDS.filter(c => {
if (filterType !== 'All' && c.type !== filterType) return false;
if (filterSet !== 'All' && c.setid !== filterSet) return false;
if (filterRarity !== 'All' && c.rarity !== filterRarity) return false;
if (!q) return true;
// Base haystack: id, name, type, rarity
let hay = `${c.id} ${c.name} ${c.type} ${c.rarity}`;
// Enriched haystack: subtype, keywords, ability names + text, flavor
const e = ENRICHED_BY_ID[c.id];
if (e) {
hay += ' ' + (e.subtype || '');
if (Array.isArray(e.keywords)) hay += ' ' + e.keywords.join(' ');
if (Array.isArray(e.abilities)) {
for (const a of e.abilities) hay += ' ' + (a.name || '') + ' ' + (a.text || '');
}
if (e.flavor) hay += ' ' + e.flavor;
}
return hay.toLowerCase().includes(q);
});
}, [query, filterType, filterSet, filterRarity]);

const activeFilterCount = (filterType !== 'All' ? 1 : 0) + (filterSet !== 'All' ? 1 : 0) + (filterRarity !== 'All' ? 1 : 0);
const clearFilters = () => { setFilterType('All'); setFilterSet('All'); setFilterRarity('All'); };

const addToDeck = (id) => setDeck(d => ({ ...d, [id]: (d[id] || 0) + 1 }));
const removeFromDeck = (id) => setDeck(d => {
const next = { ...d };
if (!next[id]) return next;
next[id]--;
if (next[id] <= 0) delete next[id];
return next;
});

return (
<>
<header className="sticky top-0 z-30 border-b border-white/[0.06]" style={{
background: 'linear-gradient(180deg, rgba(8,15,10,0.94) 0%, rgba(8,15,10,0.99) 100%)',
backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
}}>
<div className="px-4 py-3">
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2">
<div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(204,34,0,0.15)', boxShadow: '0 0 16px rgba(204,34,0,0.2)' }}>
<Library className="h-3.5 w-3.5 text-mil-red" />
</div>
<h1 className="text-xs tracking-[0.25em] text-mil-paper uppercase font-semibold">Card Library</h1>
</div>
<span className="text-[10px] text-mil-ghost tracking-wider">{CARDS.length} TOTAL</span>
</div>
<div className="relative">
<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mil-ghost" />
<input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, ID, ability text, keywords, flavor..."
className="w-full pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-mil-ghost/70 focus:outline-none transition rounded-lg"
style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }} />
{query && (<button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-mil-ghost hover:text-white"><X className="h-4 w-4" /></button>)}
</div>
<div className="flex items-center justify-between mt-2">
<button onClick={() => setShowFilters(s => !s)} className="flex items-center gap-1.5 text-xs text-mil-fade hover:text-mil-red transition">
<Filter className="h-3 w-3" /> FILTERS
{activeFilterCount > 0 && (<span className="ml-1 px-1.5 py-0.5 text-[10px] bg-yellow-400 text-stone-950 font-bold rounded-md">{activeFilterCount}</span>)}
</button>
<span className="text-[10px] text-mil-ghost tracking-wider">{filtered.length} / {CARDS.length}</span>
</div>
</div>
{showFilters && (
<div className="border-t border-white/[0.04] px-4 py-3 space-y-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
<FilterRow label="TYPE" value={filterType} options={types} onChange={setFilterType} />
<FilterRow label="SET" value={filterSet} options={sets} onChange={setFilterSet} renderLabel={(v) => v === 'All' ? 'All' : `${v} · ${SET_NAMES[v] || ''}`} />
<FilterRow label="RARITY" value={filterRarity} options={rarities} onChange={setFilterRarity} />
{activeFilterCount > 0 && (<button onClick={clearFilters} className="w-full text-xs text-mil-fade hover:text-mil-red py-1.5 rounded-md border border-white/10 hover:border-mil-red/50 transition">CLEAR FILTERS</button>)}
</div>
)}
</header>

  <main className="px-4 py-4">
    {!bannerDismissed && (
      <div className="mb-4 rounded-xl border border-indigo-500/25 p-4 relative" style={{ background: 'rgba(99,102,241,0.07)' }}>
        <button onClick={() => { setBannerDismissed(true); try { localStorage.setItem('wsk_banner_v1','1'); } catch {} }}
          className="absolute top-2 right-2 text-mil-ghost hover:text-white transition"><X className="h-4 w-4" /></button>
        <div className="text-[11px] font-bold tracking-widest text-indigo-300 mb-1.5">WELCOME TO WARSAKEN COMPANION</div>
        <p className="text-xs text-mil-stone leading-relaxed mb-2">
          Warsaken® is a <span className="text-mil-paper font-bold">physical trading card game</span> — build a real deck and play at your table. Cards are also collectible digital NFTs on the WAX blockchain. Tap any card to see its stats, abilities, and where to buy it.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href="https://www.warsaken.com" target="_blank" rel="noopener noreferrer"
            className="text-[11px] px-2.5 py-1 rounded-md border border-indigo-500/30 text-indigo-300 hover:border-indigo-400 transition">Official Site ↗</a>
          <a href="https://discord.gg/warsaken" target="_blank" rel="noopener noreferrer"
            className="text-[11px] px-2.5 py-1 rounded-md border border-indigo-500/30 text-indigo-300 hover:border-indigo-400 transition">Discord ↗</a>
          <a href="https://rules.warsaken.com" target="_blank" rel="noopener noreferrer"
            className="text-[11px] px-2.5 py-1 rounded-md border border-indigo-500/30 text-indigo-300 hover:border-indigo-400 transition">Learn to Play ↗</a>
        </div>
      </div>
    )}
    {filtered.length === 0 ? (
      <div className="py-20 text-center"><Skull className="h-8 w-8 mx-auto text-stone-700 mb-3" /><p className="text-sm text-mil-fade">no cards match.</p></div>
    ) : (
      <div className="space-y-2">
        {filtered.slice(0, 100).map(card => (
          <CardRow key={card.id} card={card} count={deck[card.id] || 0}
            onClick={() => setSelectedCard(card)}
            onAdd={() => addToDeck(card.id)}
            onRemove={() => removeFromDeck(card.id)} />
        ))}
        {filtered.length > 100 && (<div className="py-4 text-center text-xs text-mil-ghost tracking-wider border border-dashed border-mil-border">SHOWING 100 / {filtered.length} · REFINE FILTERS</div>)}
      </div>
    )}
  </main>

  {selectedCard && <CardDetail card={selectedCard} count={deck[selectedCard.id] || 0} onClose={() => setSelectedCard(null)} onAdd={() => addToDeck(selectedCard.id)} onRemove={() => removeFromDeck(selectedCard.id)} />}
</>

);
}

function FilterRow({ label, value, options, onChange, renderLabel }) {
return (
<div>
<div className="text-[10px] text-mil-fade mb-1 tracking-wider">{label}</div>
<div className="flex flex-wrap gap-1">
{options.map(opt => (
<button key={opt} onClick={() => onChange(opt)}
className={`text-[11px] px-2 py-1 border transition ${value === opt ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade hover:border-stone-600 hover:text-mil-stone'}`}>
{renderLabel ? renderLabel(opt) : opt}
</button>
))}
</div>
</div>
);
}

function CardRow({ card, count, onClick, onAdd, onRemove }) {
const meta = TYPE_META[card.type] || { Icon: Star, color: '#9ca3af', glow: 'rgba(255,255,255,0.1)', grad: '' };
const Icon = meta.Icon;
const rarMeta = RARITY_META[card.rarity] || { color: '#9ca3af' };
const inDeck = count > 0;

return (
<div className={`group relative rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${inDeck ? 'ring-1 ring-yellow-400/40' : 'ring-1 ring-white/5 hover:ring-white/15'}`}
style={{
background: `linear-gradient(135deg, ${meta.glow.replace(/[\d.]+\)/, '0.08)')} 0%, rgba(20,20,24,0.85) 35%, rgba(15,15,18,0.95) 100%)`,
boxShadow: inDeck ? `0 0 24px ${meta.glow.replace(/[\d.]+\)/, '0.15)')}, inset 0 0 0 1px rgba(204,34,0,0.15)` : '0 1px 0 rgba(255,255,255,0.03) inset',
}}>
<div className="flex items-stretch">
{/* Type icon column with glow */}
<div className="flex-shrink-0 w-14 flex flex-col items-center justify-center py-2 relative" onClick={onClick} style={{ background: 'rgba(0,0,0,0.25)' }}>
<div className="absolute inset-y-0 right-0 w-px" style={{ background: `linear-gradient(180deg, transparent, ${meta.glow}, transparent)` }} />
<Icon className="h-5 w-5 transition-transform group-hover:scale-110" style={{ color: meta.color, filter: `drop-shadow(0 0 8px ${meta.glow})` }} />
<span className="text-[8px] tracking-wider text-mil-ghost mt-1 font-mono">{card.setid}</span>
</div>

    {/* Main info */}
    <div className="flex-1 px-3 py-2.5 min-w-0" onClick={onClick}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[10px] tracking-[0.15em] font-bold" style={{ color: meta.color }}>{card.type.toUpperCase()}</span>
        <span className="text-stone-700 text-[10px]">·</span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: rarMeta.color, boxShadow: `0 0 6px ${rarMeta.glow}` }} />
        <span className="text-[10px] tracking-wider truncate" style={{ color: rarMeta.color }}>{card.rarity}</span>
      </div>
      <div className="text-sm text-stone-50 truncate font-medium leading-tight">{card.name}</div>
      <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
        <span className="text-[10px] text-mil-ghost font-mono flex-shrink-0">{card.id}</span>
        {(() => { const e = ENRICHED_BY_ID[card.id]; const sub = e?.subtype; const kws = e?.keywords?.slice(0,2); return (sub || kws?.length) ? <><span className="text-stone-700 text-[9px]">·</span><span className="text-[10px] text-mil-fade truncate">{sub || kws.join(', ')}</span></> : null; })()}
      </div>
    </div>

    {/* Counter controls */}
    <div className="flex-shrink-0 flex items-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="px-2.5 h-full text-mil-ghost hover:text-rose-400 transition disabled:opacity-30" disabled={count === 0}>
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className={`text-sm font-bold w-7 text-center ${count > 0 ? 'text-mil-red' : 'text-mil-ghost/70'}`} style={count > 0 ? { textShadow: '0 0 8px rgba(204,34,0,0.5)' } : {}}>{count}</span>
      <button onClick={(e) => { e.stopPropagation(); onAdd(); }} className="px-2.5 h-full text-mil-ghost hover:text-mil-red transition">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  </div>
</div>

);
}

function CardDetail({ card: cardProp, cardId, count, onClose, onAdd, onRemove }) {
// Accept either a full card object or just an id (so global popover can summon by id)
const card = cardProp || (cardId ? getCard(cardId) : null);
const teach = useTeach();
const [imgFailed, setImgFailed] = useState(false);
const [imgLoaded, setImgLoaded] = useState(false);

if (!card) return null;
const meta = TYPE_META[card.type] || { Icon: Star, color: '#9ca3af', glow: 'rgba(255,255,255,0.1)' };
const Icon = meta.Icon;
const rarMeta = RARITY_META[card.rarity] || { color: '#9ca3af', glow: 'rgba(0,0,0,0)' };
const enriched = card.hasFullData ? card : null;

return (
<div className="fixed inset-0 z-50" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }} onClick={onClose}>
{/* Backdrop with card-art glow bleeding through */}
<div className="absolute inset-0" style={{ background: 'rgba(5,5,7,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} />
{card.img && !imgFailed && (
<div className="fixed inset-0 pointer-events-none opacity-30" style={{
backgroundImage: `url(${card.img})`,
backgroundSize: 'cover', backgroundPosition: 'center',
filter: 'blur(40px) saturate(1.4)',
}} />
)}

  <div className="relative min-h-full flex items-start justify-center p-3 pt-6" onClick={(e) => e.stopPropagation()}>
    <div className="w-full max-w-md relative rounded-2xl overflow-hidden" style={{
      background: 'linear-gradient(180deg, rgba(8,15,10,0.94) 0%, rgba(12,12,15,0.96) 100%)',
      boxShadow: `0 20px 80px -10px ${meta.glow.replace(/[\d.]+\)/, '0.3)')}, 0 0 0 1px rgba(255,255,255,0.08)`,
    }}>
      {/* Top accent line in type color */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`, boxShadow: `0 0 12px ${meta.glow}` }} />

      {/* Close button */}
      <button onClick={onClose} className="absolute top-3 right-3 z-20 h-9 w-9 flex items-center justify-center text-mil-stone hover:text-white hover:bg-mil-muted/40 transition rounded-full" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
        <X className="h-4 w-4" />
      </button>

      {/* Header strip */}
      <div className="px-4 py-2 flex items-center justify-between text-[10px] tracking-[0.2em] text-mil-ghost border-b border-white/[0.04]">
        <span className="font-mono">FILE: {card.id}</span>
        <span className="truncate ml-2 text-mil-red/60">{(SET_NAMES[card.setid] || card.setid).toUpperCase()}</span>
      </div>

      {/* Card image with vignette */}
      <div className="relative bg-black flex items-center justify-center" style={{ minHeight: '340px' }}>
        {!imgFailed ? (<>
          {!imgLoaded && (<div className="absolute inset-0 flex items-center justify-center"><Loader2 className="h-6 w-6 text-mil-ghost animate-spin" /></div>)}
          <img src={card.img} alt={card.name} className="w-full h-auto block transition-opacity duration-500" onLoad={() => setImgLoaded(true)} onError={() => setImgFailed(true)}
            style={{ opacity: imgLoaded ? 1 : 0 }} />
          {imgLoaded && <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 70%, rgba(12,12,15,0.4) 100%)' }} />}
        </>) : (<div className="h-72 w-full flex flex-col items-center justify-center gap-2"><ImageOff className="h-12 w-12 text-stone-700" /><span className="text-xs text-mil-ghost tracking-wider">IMAGE UNAVAILABLE</span></div>)}
      </div>

      <div className="p-5 space-y-4">
        {/* Title block */}
        <div>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] mb-1.5">
            <Icon className="h-3 w-3" style={{ color: meta.color, filter: `drop-shadow(0 0 4px ${meta.glow})` }} />
            <span className="font-bold" style={{ color: meta.color }}>{card.type.toUpperCase()}</span>
            {enriched?.subtype && <>
              <span className="text-stone-700">·</span>
              <span className="text-mil-stone">{enriched.subtype}</span>
            </>}
            <span className="text-stone-700">·</span>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: rarMeta.color, boxShadow: `0 0 6px ${rarMeta.glow}` }} />
            <span style={{ color: rarMeta.color }}>{card.rarity}</span>
          </div>
          <h2 className="text-2xl text-white leading-tight font-bold">{card.name}</h2>
        </div>

        {/* Stats row (only if enriched) */}
        {enriched && (enriched.atk !== null || enriched.hp !== null || enriched.cost !== null || enriched.morale !== null) && (
          <div className="grid grid-cols-3 gap-2">
            {typeof enriched.cost === 'number' && (
              <StatBox label="↺ COST" value={enriched.cost} color="#cc2200" />
            )}
            {typeof enriched.morale === 'number' && (
              <StatBox label="MORALE" value={enriched.morale} color="#cc2200" />
            )}
            {typeof enriched.atk === 'number' && card.type !== 'WMD' && (
              <StatBox label="ATTACK" value={enriched.atk} color="#fb923c" />
            )}
            {typeof enriched.hp === 'number' && card.type !== 'WMD' && (
              <StatBox label="HEALTH" value={enriched.hp} color="#86efac" />
            )}
          </div>
        )}

        {/* Abilities — with tappable keyword highlights */}
        {enriched?.abilities && enriched.abilities.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] tracking-[0.15em] text-mil-ghost">// ABILITIES — TAP KEYWORDS TO LEARN</div>
            {enriched.abilities.map((a, i) => <AbilityCard key={i} ability={a} />)}
          </div>
        )}

        {/* Play requirement */}
        {enriched?.playRequirement && (
          <div className="text-[11px] font-bold tracking-wider text-rose-300 text-center py-2 px-3 rounded-md" style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}>
            {enriched.playRequirement}
          </div>
        )}

        {/* Lose effect */}
        {enriched?.loseEffect && (
          <div className="text-[11px] font-bold tracking-wider text-rose-300 text-center py-1.5">
            {enriched.loseEffect}
          </div>
        )}

        {/* Keywords summary chips (always tappable) */}
        {enriched?.keywords && enriched.keywords.length > 0 && (
          <div>
            <div className="text-[10px] tracking-[0.15em] text-mil-ghost mb-1.5">KEYWORDS</div>
            <div className="flex flex-wrap gap-1.5">
              {enriched.keywords.map(kw => (
                <button key={kw} onClick={() => teach.showKeyword(kw)} className="text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md transition" style={{
                  background: 'rgba(204,34,0,0.08)',
                  border: '1px solid rgba(204,34,0,0.25)',
                  color: '#cc2200',
                }}>
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Flavor */}
        {enriched?.flavor && (
          <div className="text-xs italic text-mil-fade leading-relaxed border-l-2 pl-3" style={{ borderColor: meta.color }}>
            "{enriched.flavor}"
          </div>
        )}

        {/* Add/Remove */}
        <div className="flex items-center gap-2 pt-2">
          <button onClick={onRemove} disabled={!count} className="flex-1 py-3 rounded-lg border border-white/10 text-mil-stone hover:border-rose-400 hover:text-rose-400 hover:bg-rose-500/5 transition disabled:opacity-30 flex items-center justify-center gap-2">
            <Minus className="h-4 w-4" /><span className="text-xs tracking-wider font-bold">REMOVE</span>
          </button>
          <div className="px-4 py-3 rounded-lg border border-white/10 text-mil-red font-bold min-w-[3.5rem] text-center" style={{ background: 'rgba(0,0,0,0.6)' }}>{count || 0}</div>
          <button onClick={onAdd} className="flex-1 py-3 rounded-lg border text-mil-red hover:text-mil-paper transition flex items-center justify-center gap-2 font-bold" style={{
            borderColor: 'rgba(204,34,0,0.4)',
            background: 'linear-gradient(135deg, rgba(253,224,71,0.18), rgba(204,34,0,0.05))',
            boxShadow: '0 0 24px rgba(204,34,0,0.15), inset 0 1px 0 rgba(58,107,39,0.15)',
          }}>
            <Plus className="h-4 w-4" /><span className="text-xs tracking-wider">ADD TO DECK</span>
          </button>
        </div>

        <div className="text-[10px] text-mil-ghost tracking-wider pt-2 border-t border-white/5 space-y-1">
          <div className="flex justify-between"><span>SET</span><span className="text-mil-stone">{card.setid} · {SET_NAMES[card.setid] || ''}</span></div>
          <div className="flex justify-between"><span>RARITY</span><span style={{ color: rarMeta.color }}>{card.rarity}</span></div>
          {enriched?.artist && <div className="flex justify-between"><span>ARTIST</span><span className="text-mil-stone">{enriched.artist}</span></div>}
        </div>
        <div className="flex gap-2 pt-1">
          <a href={card.url} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center px-3 py-2.5 rounded-md border border-white/10 text-mil-fade hover:border-mil-red hover:text-mil-red transition text-xs tracking-wider">
            <ExternalLink className="h-3 w-3 inline mr-1" />WARSAKEN.CARDS
          </a>
          {enriched?.atomicHubUrl && (
            <a href={enriched.atomicHubUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2.5 rounded-md border border-white/10 text-mil-fade hover:border-indigo-400 hover:text-indigo-400 transition text-xs tracking-wider">
              <ExternalLink className="h-3 w-3 inline mr-1" />ATOMICHUB
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

);
}

function StatBox({ label, value, color }) {
return (
<div className="rounded-lg p-2.5 text-center relative overflow-hidden" style={{
background: `linear-gradient(180deg, ${color}15 0%, rgba(0,0,0,0.65) 100%)`,
border: `1px solid ${color}30`,
}}>
<div className="text-[9px] tracking-[0.15em] text-mil-fade mb-0.5">{label}</div>
<div className="text-2xl font-bold leading-none" style={{ color, textShadow: `0 0 12px ${color}66` }}>{value}</div>
</div>
);
}

// AbilityCard — renders an ability and makes any matching keyword in its text tappable
function AbilityCard({ ability }) {
const teach = useTeach();
const isCooldown = ability.type === 'cooldown';
const isKeyword = ability.type === 'keyword' || ability.type === 'named';
const accent = isCooldown ? '#cc2200' : isKeyword ? '#cc2200' : '#94a3b8';

return (
<div className="rounded-lg p-3 border" style={{
background: 'rgba(0,0,0,0.65)',
borderColor: isCooldown ? 'rgba(204,34,0,0.25)' : 'rgba(255,255,255,0.06)',
borderLeftWidth: '3px',
borderLeftColor: accent,
}}>
{isCooldown && (
<div className="flex items-baseline gap-1.5 mb-1">
<span className="text-mil-red text-xs font-bold tracking-wider">↺ {ability.cost}</span>
<span className="text-mil-ghost/70">:</span>
<button onClick={() => teach.showKeyword(ability.name)} className="text-mil-red text-xs font-bold tracking-wider hover:text-mil-paper hover:underline">
{ability.name}
</button>
</div>
)}
{isKeyword && ability.name && (
<div className="mb-1">
<button onClick={() => teach.showKeyword(ability.name)} className="text-mil-red text-xs font-bold tracking-wider hover:text-mil-paper hover:underline">
{ability.name}
</button>
</div>
)}
{!isCooldown && !isKeyword && (
<div className="text-mil-ghost text-xs mb-1">★ PASSIVE</div>
)}
<p className="text-sm text-mil-paper leading-relaxed"><TeachableText text={ability.text || ''} /></p>
</div>
);
}

// Render text where any known keyword becomes a tappable link (the heart of win+learn fusion)
function TeachableText({ text }) {
const teach = useTeach();
if (!text) return null;
// Sort keywords by length descending so longer matches win
const allKw = SYN.keywords.map(k => k.name).filter(n => /^[A-Z]+$/.test(n) && n.length >= 4);
const sorted = [...allKw].sort((a, b) => b.length - a.length);
let parts = [{ t: text }];
for (const kw of sorted) {
const re = new RegExp(`\\b(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'g');
const next = [];
for (const p of parts) {
if (p.kw) { next.push(p); continue; }
const segs = p.t.split(re);
for (let i = 0; i < segs.length; i++) {
if (i % 2 === 1) next.push({ kw: segs[i] });
else if (segs[i]) next.push({ t: segs[i] });
}
}
parts = next;
}
return (
<>
{parts.map((p, i) => p.kw ? (
<button key={i} onClick={() => teach.showKeyword(p.kw)} className="text-mil-red font-bold hover:text-mil-paper hover:underline transition">
{p.kw}
</button>
) : (
<span key={i}>{p.t}</span>
))}
</>
);
}

// ============================================================================
// RULES TAB
// ============================================================================
function RulesTab() {
const [section, setSection] = useState('keywords');
const [search, setSearch] = useState('');

const sections = [
{ key: 'keywords', label: 'KEYWORDS', count: RULES.keywords.length },
{ key: 'definitions', label: 'TERMS', count: RULES.definitions.length },
{ key: 'cardTypes', label: 'TYPES', count: RULES.cardTypes.length },
{ key: 'phases', label: 'PHASES', count: RULES.phases.length },
{ key: 'deck', label: 'DECK', count: null },
{ key: 'about', label: 'ABOUT', count: null },
];

return (
<>
<header className="sticky top-0 z-30 border-b border-mil-border bg-stone-950/95 backdrop-blur">
<div className="px-4 py-3">
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2">
<BookOpen className="h-3.5 w-3.5 text-mil-red" />
<h1 className="text-xs tracking-[0.3em] text-mil-stone uppercase">Rules · v{RULES.version}</h1>
</div>
<span className="text-[10px] text-mil-ghost tracking-wider">{RULES.lastupdate}</span>
</div>
<div className="relative">
<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mil-ghost" />
<input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search.rules_"
className="w-full bg-mil-panel border border-mil-border pl-10 pr-3 py-2 text-sm text-mil-paper placeholder:text-mil-ghost/70 focus:border-mil-red focus:outline-none transition" />
</div>
<div className="flex gap-1 mt-2 overflow-x-auto pb-1">
{sections.map(s => (
<button key={s.key} onClick={() => setSection(s.key)}
className={`text-[11px] px-2.5 py-1 border whitespace-nowrap transition ${section === s.key ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>
{s.label} {s.count !== null && <span className="text-mil-ghost/70 ml-1">{s.count}</span>}
</button>
))}
</div>
</div>
</header>
<main className="px-4 py-4">
{section === 'keywords' && <KeywordList items={RULES.keywords} search={search} />}
{section === 'definitions' && <SimpleList items={RULES.definitions} search={search} />}
{section === 'cardTypes' && <SimpleList items={RULES.cardTypes} search={search} />}
{section === 'phases' && <SimpleList items={RULES.phases} search={search} />}
{section === 'deck' && <DeckRules />}
{section === 'about' && <AboutSection />}
</main>
</>
);
}

function KeywordList({ items, search }) {
const filtered = items.filter(k => {
if (!search) return true;
const q = search.toLowerCase();
return k.name.toLowerCase().includes(q) || (k.text || '').toLowerCase().includes(q) || (k.detail || '').toLowerCase().includes(q);
});
if (filtered.length === 0) return <div className="text-mil-ghost text-sm text-center py-12">no keywords match.</div>;
return (
<div className="space-y-2">
{filtered.map(k => <KeywordCard key={k.name} kw={k} />)}
</div>
);
}

function KeywordCard({ kw }) {
const [open, setOpen] = useState(false);
return (
<div className="border border-mil-border bg-mil-panel/60">
<button onClick={() => setOpen(o => !o)} className="w-full text-left px-3 py-2 hover:bg-mil-panel transition">
<div className="flex items-start justify-between gap-3">
<div className="flex-1 min-w-0">
<div className="text-mil-red text-xs font-bold tracking-wider">{kw.name}</div>
{kw.text && <div className="text-sm text-mil-stone mt-0.5">{kw.text}</div>}
</div>
{kw.detail && <ChevronRight className={`h-3.5 w-3.5 text-mil-ghost/70 mt-1 flex-shrink-0 transition ${open ? 'rotate-90' : ''}`} />}
</div>
</button>
{open && kw.detail && (
<div className="border-t border-mil-border px-3 py-2 bg-stone-950/50">
<div className="text-[10px] tracking-wider text-mil-ghost mb-1">// DETAIL</div>
<div className="text-xs text-mil-stone leading-relaxed">{kw.detail}</div>
</div>
)}
</div>
);
}

function SimpleList({ items, search }) {
const filtered = items.filter(i => {
if (!search) return true;
const q = search.toLowerCase();
return i.name.toLowerCase().includes(q) || (i.text || '').toLowerCase().includes(q);
});
if (filtered.length === 0) return <div className="text-mil-ghost text-sm text-center py-12">no entries match.</div>;
return (
<div className="space-y-2">
{filtered.map(i => (
<div key={i.name} className="border border-mil-border bg-mil-panel/60 px-3 py-2">
<div className="text-mil-red text-xs font-bold tracking-wider">{i.name.toUpperCase()}</div>
<div className="text-sm text-mil-stone mt-0.5 leading-relaxed">{i.text}</div>
</div>
))}
</div>
);
}

function DeckRules() {
const r = RULES.deckRules;
return (
<div className="space-y-3">
<div className="border border-mil-border bg-mil-panel/60 p-4">
  <div className="text-mil-red text-xs font-bold tracking-wider mb-3">STANDARD DECK</div>
  <div className="grid grid-cols-2 gap-3">
    <Stat label="TOTAL" value={r.totalCards} />
    <Stat label="LEADER" value={r.leaders} />
    <Stat label="TERRITORIES" value={r.territories} />
    <Stat label="ARSENAL" value={r.arsenal} />
  </div>
  <div className="mt-3 text-xs text-mil-stone space-y-1">
    <div>• Exactly 1 Leader card</div>
    <div>• Exactly 4 Territory cards — each must be <span className="text-mil-red font-bold">unique</span> (1 copy max per Territory)</div>
    <div>• Exactly 60 Arsenal cards</div>
    <div>• Max {r.maxCopies} copies of any same-named arsenal card</div>
  </div>
</div>
<div className="border border-mil-border bg-mil-panel/60 p-4">
  <div className="text-mil-red text-xs font-bold tracking-wider mb-2">ARSENAL CARD TYPES</div>
  <div className="text-xs text-mil-stone leading-relaxed space-y-1">
    <div>Arsenal slots may contain: <span className="text-mil-paper">Force, G Force, Building, WMD, Weather, Morale, and Intel</span> cards.</div>
    <div className="text-mil-ghost">Leader and Territory cards are <span className="text-rose-300">not</span> part of the arsenal and do not count toward the 60-card limit.</div>
    <div className="text-mil-ghost mt-1">G Force cards are a premium Force variant. Upgrade and Resource cards may appear in some sets as additional arsenal types.</div>
  </div>
</div>
<div className="border border-sky-800/40 bg-sky-900/10 p-4">
  <div className="text-sky-300 text-xs font-bold tracking-wider mb-2">BLITZ MODE</div>
  <div className="text-xs text-mil-stone leading-relaxed space-y-1">
    <div>A faster 1v1 format using the same 65-card deck structure. The goal is to eliminate your opponent's Leader directly — but you must first eliminate their Territories or deck before targeting the Leader.</div>
    <div className="text-mil-ghost">Blitz is designed as an easy-to-learn entry point. Free pre-made decks are available to new players.</div>
  </div>
</div>
<div className="border border-violet-800/40 bg-violet-900/10 p-4">
  <div className="text-violet-300 text-xs font-bold tracking-wider mb-2">CABAL MODE (SOLO)</div>
  <div className="text-xs text-mil-stone leading-relaxed">
    A solo mode where a single player completes missions by playing against the Cabal — the game's AI opponent. Ideal for deck testing and learning card combinations without needing an opponent.
  </div>
</div>
<div className="border border-mil-border bg-mil-panel/60 p-4">
  <div className="text-mil-red text-xs font-bold tracking-wider mb-2">WIN CONDITION</div>
  <div className="text-xs text-mil-stone leading-relaxed">
    The last player with a standing Leader wins. A Leader becomes <span className="text-rose-300 font-bold">Compromised</span> when their Morale reaches 0. A Compromised Leader that is eliminated ends the game.
  </div>
</div>
<div className="border border-mil-border/50 bg-stone-900/20 p-3 mt-1">
  <div className="text-[10px] text-mil-ghost leading-relaxed">
    Deck rules sourced from <span className="text-mil-red/70">rules.warsaken.com</span> (v{RULES.version}, {RULES.lastupdate}). Warsaken® is a trademark of Eclectic Nerds LLC. Always check the official rules site for the latest updates.
  </div>
</div>
</div>
);
}

function Stat({ label, value }) {
return (
<div className="border border-mil-border bg-mil-deeper px-3 py-2">
<div className="text-[10px] tracking-wider text-mil-ghost">{label}</div>
<div className="text-2xl font-bold text-mil-red leading-tight">{value}</div>
</div>
);
}

// ============================================================================
// ABOUT SECTION — credits, disclaimer, links
// ============================================================================
function AboutSection() {
const links = [
{ label: 'Official Site', href: 'https://www.warsaken.com', sub: 'warsaken.com' },
{ label: 'Rules', href: 'https://rules.warsaken.com', sub: 'rules.warsaken.com' },
{ label: 'Card Database', href: 'https://warsaken.cards', sub: 'warsaken.cards' },
{ label: 'Discord', href: 'https://discord.gg/warsaken', sub: 'discord.gg/warsaken' },
{ label: 'X / Twitter', href: 'https://x.com/TheWarsaken', sub: '@TheWarsaken' },
{ label: 'Instagram', href: 'https://instagram.com/thewarsaken', sub: '@thewarsaken' },
{ label: 'Reddit', href: 'https://reddit.com/r/thewarsaken', sub: 'r/thewarsaken' },
{ label: 'YouTube', href: 'https://youtube.com/warsaken', sub: 'youtube.com/warsaken' },
{ label: 'Facebook', href: 'https://facebook.com/thewarsaken', sub: 'thewarsaken' },
];
return (
<div className="space-y-4">
  {/* Discord CTA — most important community action */}
  <a href="https://discord.gg/warsaken" target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-3 p-4 rounded-xl border border-indigo-500/40 hover:border-indigo-400 transition group"
    style={{ background: 'rgba(99,102,241,0.08)' }}>
    <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.2)' }}>
      <span className="text-lg">💬</span>
    </div>
    <div className="min-w-0">
      <div className="text-sm font-bold text-indigo-300 group-hover:text-indigo-200 transition">Join the Warsaken Discord</div>
      <div className="text-xs text-mil-fade mt-0.5">Find players, get deck advice, follow new releases</div>
    </div>
    <ExternalLink className="h-4 w-4 text-indigo-400/50 flex-shrink-0 ml-auto" />
  </a>

  <div className="border border-mil-red/30 bg-mil-red/5 p-4">
    <div className="text-[10px] tracking-[0.2em] text-mil-red/80 mb-2">// WARSAKEN®</div>
    <div className="text-sm font-bold text-mil-paper mb-3">Created by Brandon Adams · Eclectic Nerds LLC</div>
    <div className="text-xs text-mil-stone leading-relaxed space-y-2">
      <p>
        Warsaken® is a <span className="text-mil-paper font-bold">physical trading card game</span> — you build real decks and play at your table with friends. It's a modern military-themed deck-construction game designed by Brandon Adams, who first conceived it at age 17 to connect with his father, a US Army veteran.
      </p>
      <p>
        After revisiting the idea in 2018, he founded <span className="text-mil-red">Eclectic Nerds LLC</span> and launched Warsaken commercially in 2021. Cards feature artists from around the world and are available both as physical cards and as digital collectibles on the WAX blockchain.
      </p>
      <a href="https://www.warsaken.com" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-2 text-xs text-mil-red hover:text-mil-paper transition">
        <ExternalLink className="h-3 w-3" />Get the game at warsaken.com
      </a>
    </div>
  </div>

  <div className="border border-mil-border bg-mil-panel/60 p-4">
    <div className="text-mil-red text-xs font-bold tracking-wider mb-3">OFFICIAL LINKS</div>
    <div className="space-y-1">
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-mil-muted/30 transition group">
          <span className="text-xs text-mil-stone group-hover:text-mil-red transition">{l.label}</span>
          <span className="text-[10px] text-mil-ghost group-hover:text-mil-stone transition font-mono">{l.sub}</span>
        </a>
      ))}
    </div>
  </div>

  <div className="border border-mil-border bg-mil-panel/60 p-4">
    <div className="text-mil-red text-xs font-bold tracking-wider mb-2">ABOUT THIS COMPANION</div>
    <div className="text-xs text-mil-stone leading-relaxed space-y-2">
      <p>
        This is an <span className="text-mil-red font-bold">unofficial, fan-made companion app</span> built by <span className="text-mil-red">TheoryofShadows</span> to help players browse cards, build decks, and learn the game faster.
      </p>
      <p>
        Not affiliated with or endorsed by Eclectic Nerds LLC. All card names, artwork, rules text, and the Warsaken® trademark are property of <span className="text-mil-red">Eclectic Nerds LLC</span>.
      </p>
      <p>
        Card data sourced from warsaken.cards. Deck recipes authored by the Warsaken creators at rules.warsaken.com/decks.
      </p>
    </div>
  </div>

  <div className="border border-mil-border bg-mil-panel/60 p-4">
    <div className="text-mil-red text-xs font-bold tracking-wider mb-2">HOW THE AI BUILDERS WORK</div>
    <div className="text-xs text-mil-stone leading-relaxed space-y-2">
      <p><span className="text-mil-paper font-bold">RECIPE</span> — Official deck templates from rules.warsaken.com, authored by the Warsaken creators. Cards are resolved from the full {CARDS.length}-card pool using type and subtype matching.</p>
      <p><span className="text-mil-paper font-bold">NOVEL</span> — Builds an original deck from scratch. Reads your leader's abilities to detect themes, then scores every card using keyword synergy, cost curve, and stat efficiency. Every pick shows its reasoning.</p>
      <p><span className="text-mil-paper font-bold">COUNTER-META</span> — Pick the leader you expect to face; the engine builds a deck designed to beat them using keyword counter-edges, force-type denial, and archetype disruption.</p>
      <p className="text-mil-ghost">All three builders run entirely in your browser — no server, no API key required.</p>
    </div>
  </div>

  <div className="border border-mil-border/40 p-3">
    <div className="text-[10px] text-mil-ghost/70 leading-relaxed text-center">
      Warsaken® is a registered trademark of Eclectic Nerds LLC. All rights reserved.<br />
      This companion app is a fan project and is not officially affiliated with Eclectic Nerds LLC.
    </div>
  </div>
</div>
);
}

// ============================================================================
// DECK TAB
// ============================================================================
function DeckTab({ deck, setDeck, decks, activeDeckId, setActiveDeckId, createDeck, renameDeck, deleteDeck, storageReady, onShareToast }) {
const validation = validateDeck(deck);
const [section, setSection] = useState('list'); // list | analysis | issues
const [showManager, setShowManager] = useState(false);
const [importText, setImportText] = useState('');
const [importError, setImportError] = useState(null);
const [showImport, setShowImport] = useState(false);

const sortedEntries = [...validation.entries].sort((a, b) => {
const order = ['Leader','Territory','Building','Force','WMD','Intel','Morale','Weather','G Force','Upgrade','Resource'];
const ai = order.indexOf(a.card.type), bi = order.indexOf(b.card.type);
if (ai !== bi) return ai - bi;
return a.card.name.localeCompare(b.card.name);
});

const removeAll = (id) => setDeck(d => { const n = {...d}; delete n[id]; return n; });
const inc = (id) => setDeck(d => ({...d, [id]: (d[id]||0)+1}));
const dec = (id) => setDeck(d => { const n = {...d}; n[id]--; if (n[id]<=0) delete n[id]; return n; });
const clearDeck = () => { if (confirm('Clear deck?')) setDeck({}); };

const activeDeck = activeDeckId ? decks[activeDeckId] : null;
const allDeckList = Object.values(decks).sort((a,b) => (b.updated||0) - (a.updated||0));

// Export current deck as plain text (one card per line: COUNTx CARDID NAME)
const exportText = () => {
const lines = [`# ${activeDeck?.name || 'Untitled Deck'}`];
for (const e of sortedEntries) {
lines.push(`${e.n}x ${e.card.id} ${e.card.name}`);
}
return lines.join('\n');
};

const handleExport = async () => {
const text = exportText();
try {
await navigator.clipboard.writeText(text);
onShareToast?.('Deck text copied to clipboard');
} catch {
// Fallback: show in a prompt
window.prompt('Copy this deck:', text);
}
};

const handleShareLink = async () => {
const url = buildShareUrl(activeDeck?.name || 'Untitled Deck', deck);
try {
if (navigator.share) {
await navigator.share({ title: activeDeck?.name || 'Warsaken deck', url });
onShareToast?.('Shared');
return;
}
} catch { /* user cancelled or unsupported — fall through to clipboard */ }
try {
await navigator.clipboard.writeText(url);
onShareToast?.('Share link copied');
} catch {
window.prompt('Copy this share link:', url);
}
};

const handleImport = () => {
setImportError(null);
const lines = importText.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
const next = {};
let nameLine = importText.split('\n').find(l => l.trim().startsWith('#'));
let importedName = nameLine ? nameLine.replace(/^#\s*/, '').trim() : 'Imported Deck';
let unknown = 0;
for (const line of lines) {
const m = line.match(/^(\d+)x?\s+([\w-]+)/);
if (!m) continue;
const qty = parseInt(m[1], 10);
const id = m[2];
const card = CARDS.find(c => c.id === id);
if (!card) { unknown++; continue; }
next[id] = (next[id] || 0) + qty;
}
if (Object.keys(next).length === 0) {
setImportError('No valid cards found. Format: "1x 001-000 Card Name" per line.');
return;
}
const id = createDeck(importedName, next);
setShowImport(false);
setImportText('');
if (unknown > 0) alert(`Imported with ${unknown} unknown card(s) skipped.`);
};

const handleRename = () => {
if (!activeDeckId) return;
const next = window.prompt('Deck name:', activeDeck?.name || '');
if (next && next.trim()) renameDeck(activeDeckId, next.trim());
};

const handleNewDeck = () => {
const name = window.prompt('New deck name:', 'New Deck');
if (name) {
createDeck(name.trim() || 'New Deck', {});
setShowManager(false);
}
};

const handleDelete = (id) => {
if (confirm('Delete this deck permanently?')) deleteDeck(id);
};

return (
<>
<header className="sticky top-0 z-30 border-b border-mil-border bg-stone-950/95 backdrop-blur">
<div className="px-4 py-3">
<div className="flex items-center justify-between mb-2">
<button onClick={() => setShowManager(s => !s)} className="flex items-center gap-2 min-w-0 flex-1 hover:text-mil-red transition">
<Layers className="h-3.5 w-3.5 text-mil-red flex-shrink-0" />
<span className="text-xs tracking-[0.2em] text-mil-stone uppercase truncate">{activeDeck?.name || 'Untitled Deck'}</span>
<ChevronRight className={`h-3 w-3 text-mil-ghost transition-transform ${showManager ? 'rotate-90' : ''}`} />
</button>
<div className="flex items-center gap-2 flex-shrink-0">
{validation.valid ? (
<span className="flex items-center gap-1 text-[10px] tracking-wider text-green-400"><CheckCircle2 className="h-3 w-3" /> LEGAL</span>
) : (
<span className="flex items-center gap-1 text-[10px] tracking-wider text-rose-400"><AlertTriangle className="h-3 w-3" /> {validation.issues.length}</span>
)}
<button onClick={handleShareLink} disabled={validation.total === 0} className="text-mil-ghost hover:text-mil-red disabled:opacity-30 transition" title="Copy share link">
<Share2 className="h-3.5 w-3.5" />
</button>
<button onClick={handleExport} disabled={validation.total === 0} className="text-mil-ghost hover:text-mil-red disabled:opacity-30 transition" title="Export deck text">
<ExternalLink className="h-3.5 w-3.5" />
</button>
<button onClick={clearDeck} disabled={validation.total === 0} className="text-mil-ghost hover:text-rose-400 disabled:opacity-30 transition" title="Clear deck">
<Trash2 className="h-3.5 w-3.5" />
</button>
</div>
</div>
<div className="flex items-center gap-3 text-xs text-mil-fade">
<span><span className="text-mil-paper font-bold">{validation.total}</span><span className="text-mil-ghost/70">/65</span></span>
<div className="h-3 w-px bg-mil-muted" />
<span>L: <span className="text-mil-paper">{validation.byType['Leader']||0}</span></span>
<span>T: <span className="text-mil-paper">{validation.byType['Territory']||0}</span></span>
<span>A: <span className="text-mil-paper">{validation.total - (validation.byType['Leader']||0) - (validation.byType['Territory']||0)}</span></span>
</div>
<div className="flex gap-1 mt-2 flex-wrap">
<button onClick={() => setSection('list')} className={`text-[11px] px-2.5 py-1 border transition ${section === 'list' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>LIST</button>
<button onClick={() => setSection('analysis')} className={`text-[11px] px-2.5 py-1 border transition ${section === 'analysis' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>ANALYSIS</button>
<button onClick={() => setSection('practice')} className={`text-[11px] px-2.5 py-1 border transition ${section === 'practice' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>PRACTICE</button>
<button onClick={() => setSection('issues')} className={`text-[11px] px-2.5 py-1 border transition ${section === 'issues' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>
ISSUES {validation.issues.length > 0 && <span className="ml-1 text-rose-400">{validation.issues.length}</span>}
</button>
</div>
</div>

    {showManager && (
      <div className="border-t border-mil-border bg-stone-900/80 px-4 py-3 space-y-2">
        <div className="flex items-center gap-2">
          <button onClick={handleNewDeck} className="flex-1 text-[11px] px-2 py-1.5 border border-mil-red/40 text-mil-red bg-mil-red/10 hover:bg-mil-red/20 transition tracking-wider">
            <Plus className="h-3 w-3 inline -mt-0.5 mr-1" />NEW DECK
          </button>
          <button onClick={() => setShowImport(s => !s)} className="flex-1 text-[11px] px-2 py-1.5 border border-mil-green text-mil-stone hover:border-mil-red hover:text-mil-red transition tracking-wider">
            IMPORT
          </button>
          {activeDeckId && (
            <button onClick={handleRename} className="flex-1 text-[11px] px-2 py-1.5 border border-mil-green text-mil-stone hover:border-mil-red hover:text-mil-red transition tracking-wider">
              RENAME
            </button>
          )}
        </div>

        {showImport && (
          <div className="space-y-2 pt-2 border-t border-mil-border">
            <div className="text-[10px] text-mil-ghost tracking-wider">PASTE DECK TEXT (1x 001-000 NAME format)</div>
            <textarea value={importText} onChange={(e) => setImportText(e.target.value)} rows={5}
              placeholder="# Deck Name&#10;1x 001-000 Roman Volkov, the Exile&#10;1x 001-009 Wolf Power District&#10;..."
              className="w-full bg-mil-deeper border border-mil-border px-2 py-1.5 text-xs text-mil-paper placeholder:text-stone-700 focus:border-mil-red focus:outline-none transition font-mono resize-none" />
            {importError && <div className="text-[10px] text-rose-400">{importError}</div>}
            <div className="flex gap-2">
              <button onClick={handleImport} disabled={!importText.trim()} className="flex-1 text-[11px] py-1.5 border border-mil-red text-mil-red bg-mil-red/10 hover:bg-mil-red/20 disabled:opacity-30 transition tracking-wider">
                IMPORT DECK
              </button>
              <button onClick={() => { setShowImport(false); setImportText(''); setImportError(null); }} className="flex-1 text-[11px] py-1.5 border border-mil-green text-mil-fade hover:text-mil-stone transition tracking-wider">
                CANCEL
              </button>
            </div>
          </div>
        )}

        {allDeckList.length > 0 && (
          <div className="space-y-1 pt-2 border-t border-mil-border">
            <div className="text-[10px] text-mil-ghost tracking-wider">SAVED DECKS ({allDeckList.length})</div>
            {allDeckList.map(d => {
              const total = Object.values(d.cards || {}).reduce((s,n) => s+n, 0);
              const isActive = d.id === activeDeckId;
              return (
                <div key={d.id} className={`flex items-center gap-2 border px-2 py-1.5 transition ${isActive ? 'border-mil-red bg-mil-red/10' : 'border-mil-border hover:border-mil-green'}`}>
                  <button onClick={() => { setActiveDeckId(d.id); setShowManager(false); }} className="flex-1 text-left min-w-0">
                    <div className="text-xs text-mil-paper truncate">{d.name}</div>
                    <div className="text-[10px] text-mil-ghost">{total}/65 cards</div>
                  </button>
                  <button onClick={() => handleDelete(d.id)} className="text-mil-ghost/70 hover:text-rose-400 transition" title="Delete">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {!storageReady && (
          <div className="text-[10px] text-mil-ghost italic">Loading saved decks...</div>
        )}
        {storageReady && allDeckList.length === 0 && (
          <div className="text-[10px] text-mil-ghost italic">No saved decks yet. Decks are auto-saved as you build.</div>
        )}
      </div>
    )}
  </header>
  <main className="px-4 py-4">
    {validation.total === 0 ? (
      <div className="py-20 text-center">
        <Layers className="h-10 w-10 mx-auto text-stone-700 mb-3" />
        <p className="text-sm text-mil-fade">no cards in deck.</p>
        <p className="text-xs text-mil-ghost/70 mt-1 tracking-wider">USE THE CARDS TAB TO ADD CARDS</p>
        <p className="text-xs text-mil-ghost/70 mt-3 tracking-wider">OR TRY THE AI BUILDER</p>
      </div>
    ) : section === 'list' ? (
      <DeckList entries={sortedEntries} onInc={inc} onDec={dec} onRemove={removeAll} />
    ) : section === 'analysis' ? (
      <DeckAnalysis deck={deck} validation={validation} />
    ) : section === 'practice' ? (
      <PracticeSection deck={deck} validation={validation} />
    ) : (
      <DeckIssues issues={validation.issues} valid={validation.valid} />
    )}
  </main>
</>

);
}

function DeckList({ entries, onInc, onDec, onRemove }) {
// Group by type
const groups = {};
for (const e of entries) {
if (!groups[e.card.type]) groups[e.card.type] = [];
groups[e.card.type].push(e);
}
return (
<div className="space-y-4">
{Object.entries(groups).map(([type, items]) => {
const meta = TYPE_META[type] || { Icon: Star, color: '#9ca3af' };
const Icon = meta.Icon;
const total = items.reduce((s, e) => s + e.n, 0);
return (
<div key={type}>
<div className="flex items-center gap-2 mb-2 px-1">
<Icon className="h-3.5 w-3.5" style={{ color: meta.color }} />
<span className="text-[10px] tracking-[0.2em] font-bold" style={{ color: meta.color }}>{type.toUpperCase()}</span>
<span className="text-[10px] text-mil-ghost/70">×{total}</span>
</div>
<div className="space-y-1">
{items.map(e => (
<div key={e.card.id} className="flex items-center gap-2 border border-mil-border bg-mil-panel/60 px-3 py-2">
<div className="flex-1 min-w-0">
<div className="text-sm text-mil-paper truncate">{e.card.name}</div>
<div className="text-[10px] text-mil-ghost">{e.card.id} · {e.card.rarity}</div>
</div>
<div className="flex items-center gap-0">
<button onClick={() => onDec(e.card.id)} className="px-2 text-mil-ghost hover:text-rose-400 transition"><Minus className="h-3.5 w-3.5" /></button>
<span className="text-mil-red font-bold w-6 text-center text-sm">{e.n}</span>
<button onClick={() => onInc(e.card.id)} className="px-2 text-mil-ghost hover:text-mil-red transition"><Plus className="h-3.5 w-3.5" /></button>
</div>
<button onClick={() => onRemove(e.card.id)} className="text-mil-ghost/70 hover:text-rose-400 transition ml-1"><Trash2 className="h-3.5 w-3.5" /></button>
</div>
))}
</div>
</div>
);
})}
</div>
);
}

function DeckAnalysis({ deck, validation }) {
const teach = useTeach();
const analysis = useMemo(() => analyzeDeck(deck), [deck]);
const types = Object.entries(validation.byType).sort((a, b) => b[1] - a[1]);
const max = Math.max(...types.map(t => t[1]), 1);
const bySet = {};
for (const e of validation.entries) bySet[e.card.setid] = (bySet[e.card.setid] || 0) + e.n;
const byRarity = {};
for (const e of validation.entries) byRarity[e.card.rarity] = (byRarity[e.card.rarity] || 0) + e.n;

if (!analysis) return null;

const ARCH_META = {
aggro:    { color: '#fb7185', label: 'AGGRO',    desc: 'Pressure-focused — fast cards and damage keywords push leader compromise quickly.' },
control:  { color: '#7dd3fc', label: 'CONTROL',  desc: 'Removal-heavy — locks/stuns/eliminates threats while grinding to a long-game win.' },
tempo:    { color: '#c084fc', label: 'TEMPO',    desc: 'Card-advantage — draw engines + cheap plays compound into a dominant position.' },
ramp:     { color: '#86efac', label: 'RAMP',     desc: 'Build-up — heavier curve banking on big resource production for late-game payoffs.' },
midrange: { color: '#cc2200', label: 'MIDRANGE', desc: 'Balanced — no single dominant axis; flexible and reactive.' },
};
const archMeta = ARCH_META[analysis.archetype];

return (
<div className="space-y-4">
{/* Archetype banner */}
<div className="rounded-xl p-4 relative overflow-hidden" style={{
background: `linear-gradient(135deg, ${archMeta.color}22, rgba(20,20,24,0.85))`,
border: `1px solid ${archMeta.color}55`,
boxShadow: `0 8px 32px -8px ${archMeta.color}33`,
}}>
<div className="text-[10px] tracking-[0.2em] mb-1" style={{ color: archMeta.color }}>// DECK ARCHETYPE</div>
<div className="text-2xl font-bold mb-1.5" style={{ color: archMeta.color }}>{archMeta.label}</div>
<div className="text-xs text-mil-stone leading-relaxed mb-3">{archMeta.desc}</div>
{analysis.themes.length > 0 && (
<div className="flex flex-wrap gap-1.5">
{analysis.themes.map(t => (
<span key={t} className="text-[10px] tracking-wider px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#e7e5e4' }}>{t.toUpperCase()}</span>
))}
</div>
)}
<div className="grid grid-cols-4 gap-1.5 mt-3">
{Object.entries(analysis.archetypeScores).map(([k, v]) => (
<div key={k} className="text-center rounded p-1.5" style={{ background: 'rgba(0,0,0,0.6)', border: k === analysis.archetype ? `1px solid ${archMeta.color}` : '1px solid rgba(255,255,255,0.05)' }}>
<div className="text-[8px] tracking-wider text-mil-fade">{k.toUpperCase()}</div>
<div className="text-sm font-bold" style={{ color: k === analysis.archetype ? archMeta.color : '#a8a29e' }}>{v}</div>
</div>
))}
</div>
</div>

  {/* Synergy density */}
  {Object.keys(analysis.keywordCounts).length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Network className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">SYNERGY DENSITY · TAP TO LEARN</div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(analysis.keywordCounts).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([kw, n]) => (
          <button key={kw} onClick={() => teach.showKeyword(kw)} className="text-[11px] px-2 py-1 rounded-md transition" style={{
            background: 'rgba(204,34,0,0.1)', border: '1px solid rgba(204,34,0,0.3)', color: '#cc2200',
          }}>
            {kw} <span className="text-mil-red/70 font-bold ml-1">×{n}</span>
          </button>
        ))}
      </div>
    </div>
  )}

  {/* Active synergies (documented edges that fire in this deck) */}
  {analysis.activeSynergies.length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(192,132,252,0.2)' }}>
      <div className="flex items-center gap-2 mb-3">
        <GitBranch className="h-3.5 w-3.5 text-purple-300" />
        <div className="text-xs font-bold text-purple-200 tracking-wider">ACTIVE SYNERGIES</div>
      </div>
      <div className="space-y-1.5">
        {analysis.activeSynergies.slice(0, 6).map((s, i) => (
          <div key={i} className="flex items-center justify-between text-[11px] gap-2">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <button onClick={() => teach.showKeyword(s.pair[0])} className="text-purple-200 hover:text-white truncate transition">{s.pair[0]}</button>
              <span className="text-mil-ghost/70 flex-shrink-0">×</span>
              <button onClick={() => teach.showKeyword(s.pair[1])} className="text-purple-200 hover:text-white truncate transition">{s.pair[1]}</button>
            </div>
            <span className="text-purple-300 font-mono font-bold flex-shrink-0">{s.aCount}/{s.bCount}</span>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Cost curve */}
  {Object.keys(analysis.costCurve).length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">COST CURVE</div>
      </div>
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map(c => {
          const n = analysis.costCurve[c] || 0;
          const cMax = Math.max(...Object.values(analysis.costCurve), 1);
          return (
            <div key={c}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-mil-stone font-mono">↺ {c}{c === 4 ? '+' : ''}</span>
                <span className="text-mil-fade">{n} cards</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(n / cMax) * 100}%`, background: 'linear-gradient(90deg, #cc2200, #fb923c)', boxShadow: '0 0 8px rgba(204,34,0,0.4)' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Predicted matchups (based on counter coverage of opposing recipes) */}
  {analysis.matchups.length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(251,113,133,0.2)' }}>
      <div className="flex items-center gap-2 mb-3">
        <Crosshair className="h-3.5 w-3.5 text-rose-300" />
        <div className="text-xs font-bold text-rose-200 tracking-wider">PREDICTED MATCHUPS · COUNTER COVERAGE</div>
      </div>
      <div className="space-y-1.5">
        {analysis.matchups.slice(0, 8).map(m => {
          const pct = Math.round(m.score * 100);
          const color = m.score >= 0.5 ? '#86efac' : m.score >= 0.25 ? '#cc2200' : '#fb7185';
          return (
            <div key={m.leader.id} className="text-[11px]">
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="text-mil-stone truncate flex-1">vs {m.leader.name}</span>
                <span className="font-mono font-bold flex-shrink-0" style={{ color }}>{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-[10px] text-mil-ghost mt-3 leading-relaxed">
        Score = % of opposing leader's predicted threat keywords your deck has at least one explicit counter for. Based on their official recipes.
      </div>
    </div>
  )}

  {/* Force-type composition */}
  {(analysis.forceTypes.Ground + analysis.forceTypes.Air + analysis.forceTypes.Navy) > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">FORCE COMPOSITION</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['Ground', 'Air', 'Navy'].map(t => (
          <div key={t} className="text-center rounded-lg p-2" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-[9px] tracking-[0.2em] text-mil-fade">{t.toUpperCase()}</div>
            <div className="text-base font-bold mt-1 text-mil-paper">{analysis.forceTypes[t]}</div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Type / set / rarity (preserved from old analysis) */}
  <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="text-xs font-bold text-mil-paper tracking-wider mb-3">TYPE DISTRIBUTION</div>
    <div className="space-y-2">
      {types.map(([t, n]) => {
        const meta = TYPE_META[t] || { color: '#9ca3af' };
        return (
          <div key={t}>
            <div className="flex justify-between text-xs mb-0.5">
              <span className="text-mil-stone">{t}</span>
              <span className="text-mil-ghost">{n}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
              <div className="h-full rounded-full" style={{ width: `${(n / max) * 100}%`, backgroundColor: meta.color }} />
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* Weaknesses */}
  {analysis.weaknesses.length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.3)' }}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-3.5 w-3.5 text-rose-300" />
        <div className="text-xs font-bold text-rose-200 tracking-wider">DETECTED WEAKNESSES</div>
      </div>
      <div className="space-y-1.5 text-xs text-mil-stone">
        {analysis.weaknesses.map((w, i) => (<div key={i} className="leading-relaxed">{w}</div>))}
      </div>
    </div>
  )}
</div>

);
}

// Practice / opening-hand simulator with hypergeometric draw probability calc.
function PracticeSection({ deck, validation }) {
const teach = useTeach();
// Shuffled id sequence is the source of truth — drawnCount slices it so
// DRAW +1 appends the next card from the same shuffle instead of reshuffling.
const [arsenal, setArsenal] = useState([]);
const [drawnCount, setDrawnCount] = useState(0);
const [seed, setSeed] = useState(0); // bumps to force a new shuffle on mulligan
const [probCardId, setProbCardId] = useState(null);

const arsenalSize = useMemo(() => {
let s = 0;
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (!c || c.type === 'Leader' || c.type === 'Territory') continue;
s += n;
}
return s;
}, [deck]);

const arsenalCards = useMemo(() => {
const list = [];
for (const [id, n] of Object.entries(deck)) {
const c = getCard(id);
if (!c || c.type === 'Leader' || c.type === 'Territory') continue;
list.push({ card: c, n });
}
return list.sort((a, b) => b.n - a.n || a.card.name.localeCompare(b.card.name));
}, [deck]);

// Draw a fresh opening hand (reshuffles the arsenal)
const drawOpeningHand = () => {
const a = shuffleArsenal(deck);
setArsenal(a);
setDrawnCount(Math.min(8, a.length));
setSeed(s => s + 1);
};

// Mulligan: reshuffle and re-draw an opening hand
const mulligan = () => drawOpeningHand();

// Reveal the next card from the existing shuffle (turn simulation)
const drawNext = () => {
setDrawnCount(c => Math.min(c + 1, arsenal.length));
};

const reset = () => { setArsenal([]); setDrawnCount(0); };

const hand = useMemo(
() => arsenal.slice(0, drawnCount).map(id => getCard(id)).filter(Boolean),
[arsenal, drawnCount]
);

const probCard = probCardId ? getCard(probCardId) : null;
const probCopies = probCardId ? (deck[probCardId] || 0) : 0;
const TURNS = [1, 2, 3, 4, 5, 6, 7, 8, 10];
const probCurve = probCardId ? TURNS.map(t => ({
turn: t, p: cardDrawProbability(deck, probCardId, 8 + (t - 1), 1),
})) : [];

if (validation.total < 10) {
return (
<div className="rounded-xl p-6 text-center" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
<Activity className="h-10 w-10 mx-auto text-stone-700 mb-3" />
<p className="text-sm text-mil-fade">Practice mode needs at least 10 cards in deck.</p>
<p className="text-xs text-mil-ghost/70 mt-1 tracking-wider">CURRENTLY {validation.total}</p>
</div>
);
}

return (
<div className="space-y-4">
{/* Header / arsenal stats */}
<div className="rounded-xl p-4 relative overflow-hidden" style={{
background: 'linear-gradient(135deg, rgba(192,132,252,0.08), rgba(13,26,15,0.8))',
border: '1px solid rgba(192,132,252,0.25)',
}}>
<div className="text-[10px] tracking-[0.2em] text-purple-300/80 mb-1">// PRACTICE · GOLDFISH MODE</div>
<div className="text-sm text-mil-stone leading-relaxed">
Shuffle your arsenal and draw an opening hand. Mulligan to re-draw. Tap any card in the arsenal below to see <span className="text-purple-300 font-bold">hypergeometric draw probabilities</span> turn-by-turn.
</div>
<div className="grid grid-cols-3 gap-2 mt-3">
<StatBox label="ARSENAL" value={arsenalSize} color="#c084fc" />
<StatBox label="DRAWN" value={drawnCount} color="#cc2200" />
<StatBox label="LEFT" value={Math.max(0, arsenalSize - drawnCount)} color="#86efac" />
</div>
</div>

  {/* Hand area */}
  {hand.length === 0 ? (
    <button onClick={drawOpeningHand} className="w-full py-6 rounded-xl text-purple-100 hover:text-white transition flex items-center justify-center gap-2 font-bold tracking-wider" style={{
      background: 'linear-gradient(135deg, rgba(192,132,252,0.2), rgba(192,132,252,0.05))',
      border: '1px solid rgba(192,132,252,0.5)',
      boxShadow: '0 8px 32px rgba(192,132,252,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
    }}>
      <Sparkles className="h-4 w-4" /> DRAW OPENING HAND (8)
    </button>
  ) : (
    <div className="space-y-3">
      <div className="rounded-xl p-3" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(192,132,252,0.2)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold text-purple-200 tracking-wider">YOUR HAND ({hand.length})</div>
          <div className="text-[10px] text-mil-ghost tracking-wider">SHUFFLE #{seed}</div>
        </div>
        <div className="space-y-1">
          {hand.map((c, i) => {
            const meta = TYPE_META[c.type] || { color: '#9ca3af' };
            return (
              <button key={`${c.id}-${i}`} onClick={() => teach.showCard(c.id)} className="w-full flex items-center gap-2 text-xs py-1.5 px-2 rounded hover:bg-mil-muted/30 transition text-left">
                <span className="text-[9px] font-bold tracking-wider w-12 flex-shrink-0" style={{ color: meta.color }}>{c.type.slice(0, 4).toUpperCase()}</span>
                <span className="text-mil-paper flex-1 truncate">{c.name}</span>
                {typeof c.cost === 'number' && <span className="text-[10px] text-mil-ghost font-mono flex-shrink-0">↺{c.cost}</span>}
                {c.hasFullData && <span className="text-[8px] text-emerald-400 tracking-wider flex-shrink-0">DATA</span>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button onClick={mulligan} className="py-2.5 rounded-lg text-xs font-bold tracking-wider text-purple-200 hover:text-white transition" style={{
          background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.4)',
        }}>MULLIGAN</button>
        <button onClick={drawNext} disabled={drawnCount >= arsenalSize} className="py-2.5 rounded-lg text-xs font-bold tracking-wider text-mil-paper hover:text-white transition disabled:opacity-30" style={{
          background: 'rgba(204,34,0,0.1)', border: '1px solid rgba(204,34,0,0.4)',
        }}>DRAW +1</button>
        <button onClick={reset} className="py-2.5 rounded-lg text-xs font-bold tracking-wider text-mil-fade hover:text-mil-stone transition" style={{
          background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.08)',
        }}>RESET</button>
      </div>
    </div>
  )}

  {/* Probability calculator */}
  <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(125,211,252,0.2)' }}>
    <div className="flex items-center gap-2 mb-3">
      <Activity className="h-3.5 w-3.5 text-sky-300" />
      <div className="text-xs font-bold text-sky-200 tracking-wider">DRAW PROBABILITY · HYPERGEOMETRIC</div>
    </div>
    <div className="text-[10px] text-mil-ghost mb-3 leading-relaxed">
      P(see ≥1 copy of selected card by turn N), accounting for opening hand of 8 + 1 draw per turn from a {arsenalSize}-card arsenal.
    </div>
    <div className="text-[10px] tracking-[0.2em] text-mil-fade mb-2">// PICK A CARD</div>
    <div className="max-h-44 overflow-y-auto space-y-1 mb-3 pr-1">
      {arsenalCards.slice(0, 30).map(({ card: c, n }) => {
        const meta = TYPE_META[c.type] || { color: '#9ca3af' };
        const active = probCardId === c.id;
        return (
          <button key={c.id} onClick={() => setProbCardId(c.id)} className={`w-full flex items-center gap-2 text-xs py-1.5 px-2 rounded transition text-left ${active ? 'bg-sky-500/15' : 'hover:bg-mil-muted/30'}`} style={active ? { border: '1px solid rgba(125,211,252,0.5)' } : { border: '1px solid transparent' }}>
            <span className="text-[9px] font-bold tracking-wider w-12 flex-shrink-0" style={{ color: meta.color }}>{c.type.slice(0, 4).toUpperCase()}</span>
            <span className="text-mil-paper flex-1 truncate">{c.name}</span>
            <span className="text-mil-red font-mono font-bold w-7 text-right">×{n}</span>
          </button>
        );
      })}
    </div>
    {probCard && (
      <div className="rounded-lg p-3 mt-2" style={{ background: 'rgba(125,211,252,0.05)', border: '1px solid rgba(125,211,252,0.2)' }}>
        <div className="text-[10px] tracking-wider text-sky-300/80 mb-1">// {probCard.name} · {probCopies}-of</div>
        <div className="space-y-1.5">
          {probCurve.map(p => {
            const pct = Math.round(p.p * 100);
            const color = p.p >= 0.75 ? '#86efac' : p.p >= 0.5 ? '#cc2200' : p.p >= 0.25 ? '#fb923c' : '#fb7185';
            return (
              <div key={p.turn}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-mil-fade font-mono">turn {p.turn}</span>
                  <span style={{ color }} className="font-mono font-bold">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
</div>

);
}

function DeckIssues({ issues, valid }) {
if (valid) {
return (
<div className="border border-green-500/30 bg-green-500/5 p-4 text-center">
<CheckCircle2 className="h-8 w-8 mx-auto text-green-400 mb-2" />
<div className="text-sm text-green-300 font-bold tracking-wider">DECK IS LEGAL</div>
<div className="text-xs text-mil-fade mt-1">All structural rules satisfied for Standard format.</div>
</div>
);
}
return (
<div className="space-y-2">
{issues.map((iss, i) => (
<div key={i} className="border border-rose-500/30 bg-rose-500/5 p-3 flex items-start gap-2">
<AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
<div className="text-sm text-mil-stone">{iss.msg}</div>
</div>
))}
</div>
);
}

// ============================================================================
// SYNERGY DISCOVERY ENGINE — keyword interaction graph mined from rules text
// + co-occurrence patterns across enriched card pool. Engine is data-driven;
// improves automatically as more cards are enriched.
// ============================================================================
const SYN = {"keywords":[{"name":"(X) START MORALE","text":"","detail":"Triggered mechanic. This sets the start value for your morale in a game and is found exclusively on leader cards. This mechanic is triggered only at the start of the game."},{"name":"(X) CARD START HAND","text":"","detail":"Triggered mechanic. This sets the start value for your hand size in a game and is found exclusively on leader cards. If this is not on the leader card you start the game with, default to 8 cards in your starting hand. This mechanic is triggered only at the start of the game."},{"name":"(X) START RESOURCE","text":"","detail":"Triggered mechanic. This sets the start resource(s) attached to your available on the firs tturn. This mechanic is found exclusively on leader cards. This mechanic is triggered only at the start of the game."},{"name":"(X) (GENERIC) PER TURN","text":"","detail":"Triggered mechanic. Produce an additional (X) generic resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (FOOD) PER TURN","text":"","detail":"Triggered mechanic. Produce an additional (X) food resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (POWER) PER TURN","text":"","detail":"Triggered mechanic. Produce an additional (X) power resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (FUEL) PER TURN","text":"","detail":"Triggered mechanic. Produce an additional (X) fuel resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) (EQUIPMENT) PER TURN","text":"","detail":"Triggered mechanic. Produce an additional (X) equipment resource(s) when the card with this mechanic is ready in the war zone, and during the produce phase in each following turn the card with this mechanic is in the war zone. These resources are attached to the card with this mechanic at the time they are produced. If the card with this mechanic is eliminated, any resources attached to it are also eliminated. Resources will always be produced in whole numbers of resources and not fractions."},{"name":"(X) MORALE","text":"","detail":"Triggered mechanic. Adds or subtracts (X) Morale to your legion. Morale can never fall below zero."},{"name":"(X) MORALE PER TURN","text":"","detail":"Triggered mechanic. Playing this causes a gain or loss of (X) Morale per each turn it is in effect. Morale can never fall below zero."},{"name":"(X) MORALE","text":"To each player.","detail":"Triggered mechanic. Playing this causes all players to gain or lose (X) Morale. Morale can never fall below zero."},{"name":"(X) MORALE","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Morale. Morale can never fall below zero."},{"name":"(X) MORALE PER TURN","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Morale per each turn it is in effect. Morale can never fall below zero."},{"name":"MORALE (operator) (X) :","text":"(ability)","detail":"Fixed rule. While morale (condition X) is met, each condition on this is in effect."},{"name":"(X) INTEL","text":"","detail":"Triggered mechanic. Playing this causes a gain or loss of (X) Intel when played. Intel can never fall below zero."},{"name":"(X) INTEL PER TURN","text":"","detail":"Triggered mechanic. Playing this causes a gain or loss of (X) Intel per each turn it is in effect. Intel can never fall below zero."},{"name":"(X) OWNER INTEL PER TURN","text":"","detail":"Triggered mechanic. Applies (X) Owner Intel to your legion per turn specified. The owner is not necessarily the controller, but rather the person who began the gaem with this card in their deck. Intel can never fall below zero."},{"name":"(X) INTEL","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Intel. Intel can never fall below zero."},{"name":"(X) INTEL PER TURN","text":"To a specific enemy.","detail":"Triggered mechanic. Playing this causes a specific enemy to gain or lose (X) Intel per each turn it is in effect. Intel can never fall below zero."},{"name":"(X) ATTACK","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Attack to each (type or subtype) in your legion. Attack can never fall below zero."},{"name":"(X) ATTACK THIS TURN","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Attack to each (type or subtype) in your legion per each specified turn. Attack can never fall below zero."},{"name":"(X) HEALTH","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in your legion. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH THIS TURN","text":"To each (type text) in your legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in your legion per each specified turn. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH THIS TURN","text":"To each (type text).","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in all legions this turn. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH","text":"To each (type text) in a specific enemy legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in a specific enemy legion. If health is reduced to zero, affected cards are eliminated."},{"name":"(X) HEALTH THIS TURN","text":"To each (type text) in a specific enemy legion.","detail":"Fixed rule. Automatically applies (X) Health to each (type or subtype) in a specific enemy legion per each specified turn. If health is reduced to zero, affected cards are eliminated."},{"name":"ACCESS","text":"Draw 2 cards. Discard a card.","detail":"Triggered mechanic. When this triggers, draw 2 cards from your arsenal, and then discard 1 card of your choice from your hand."},{"name":"AIR RAID","text":"All enemy territories take 10 damage.","detail":"Triggered mechanic. All enemy players' territories take 10 damage each."},{"name":"ANTI-AIR","text":"Can block air forces; blocked bombers are eliminated. Air forces don't damage this.","detail":"Fixed rule. Cards with this mechanic are allowed to block air forces during battle. When it blocks a bomber, that bomber force is eliminated. Air forces can't give damage to cards with this mechanic at any point."},{"name":"ANTI-GROUND","text":"Can block army and soldier forces.","detail":"Fixed rule. Cards with this mechanic are allowed to block both soldier and army forces during battle."},{"name":"ANTI-NAVAL","text":"Can block navy forces.","detail":"Fixed rule. Cards with this mechanic are allowed to block navy forces during battle."},{"name":"ARMADA","text":"Find 1 navy force and up to 3 other unique navy forces in your hand, with a cost timer of < 2; put them with your legion; they're ready.","detail":"Triggered mechanic. The first navy force card from your hand can be any navy force card, while the other 3 must have a cost timer of less than 2. Each of the cards put with your legion this way must be unique meaning they have different card names, as uniquness is defined by unique card names. When you put them with your legion you will place them face up as they are ready immediately."},{"name":"ARMORED","text":"Not affected by dead man and pick-off.","detail":"Fixed rule. Dead man and pick-off mechanics can't affect cards with this mechanic."},{"name":"ARTILLERY","text":"Can't block; can't be blocked by soldiers.","detail":"Fixed rule. A card with this mechanic can't block in battle and can't be blocked by any force with the soldier subtype."},{"name":"ASHES","text":"All soldiers of a specific enemy are eliminated.","detail":"Triggered mechanic. All soldier forces that a specific enemy controls are eliminated."},{"name":"(X) : ATTACH : (TYPE)","text":"Attach (X) (type text) from your arsenal to this; [it's|they're] ready. Shuffle your arsenal. Reattach after every battle, or [it's|they're] eliminated.","detail":"Triggered mechanic. Find (X) number of (type or subtype) from your arsenal and attach them to this card. The player must shuffle their arsenal after finding and attaching the cards. During battle the attached cards detach and act as independent cards, but must re-attach to this card after each battle. If the card with the attach mechanic is eliminated outside of the battle phase before the attached cards are eliminated, the attached cards are eliminated as well."},{"name":"(X) : AMPLIFY : (TYPE)","text":"This gains (X) attack for each other (type text) in your legion.","detail":"Fixed rule. A card with this mechanic adds 10 to its attack value for each other card in your legion that matches the specified type or subtype."},{"name":"AWE","text":"A specific card without stealth takes 50 damage.","detail":"Triggered mechanic. Choose an eligible enemy force, territory, building, or leader card without stealth and deal 50 damage to it immediately."},{"name":"BEAM","text":"Forces blocked by this lose evade.","detail":"Fixed rule. When the card that has this mechanic blocks a card with the mechanic evade, it's as if that card does not have evade for the duration of the battle."},{"name":"BIG STICK","text":"For each enemy, find a WMD in your arsenal and put it with your legion; it's ready. Gain 1 morale for each WMD in your discard. Shuffle your arsenal.","detail":"Triggered mechanic. For each enemy, find a WMD card in your arsenal and place it face up with your legion to indicate it is ready. Choose the target for each WMD and the order they activate if more than one enters your legion from this mechanic, and then discard them. Count the number of WMD type cards in your discard and gain 1 morale for each, then shuffle your arsenal."},{"name":"BLITZ","text":"Excess damage gets through a blocker.","detail":"Fixed rule. During battle, if a card blocks this it will still deal damage equal to its attack value, minus the health value of the blocking card, to the original intended eligible target regardless of the blocking card being eliminated or not.."},{"name":"BLIGHT","text":"The card this is attached to takes 10 damage for each infected force in your legion; if it's eliminated put this on the bottom of its owner's arsenal.","detail":"Triggered mechanic. As soon as this mechanic is triggered, count the number of forces in your legion with the infected subtype and multiply the number by 10. Deal that number as damage to the card this is attached to. If that damage eliminates the card it was dealt to, put the card with the blight mechanic on the bottom of its owner's arsenal."},{"name":"BLUEPRINT","text":"Find a specific building in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a building type and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"BOG","text":"For each enemey, 2 specific territories take 200 damage. Increase each enemy non-leader timer by 1.","detail":"Triggered mechanic. For each enemy, choose 2 specific territories in their legion to take 200 damage each. All enemy timers, except leader timers, are increased by 1. (This includes countdown, ability, required, and cost timers)."},{"name":"BOMBS","text":"Can't block; can only damage buildings, territories, and leaders.","detail":"Fixed rule. Cards with this mechanic are not allowed to block. Their damage can only be dealt to building, territory, or leader cards."},{"name":"BOW","text":"Find a specific navy force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of navy and show it to other players in the game, after which put it with your legion. Then shuffle your arsenal."},{"name":"BROKEN CODE","text":"Enemies play the rest of the game with their hands revealed; for each, find a card in your hand or theirs and put it with your legion; it's ready.","detail":"Triggered mechanic. Once triggered, all enemies will play the entire game from this point forward with their hand visible to the controller of this card. The controller of this card doesn't reveal their hand, only enemies. The player that triggers this ability is allowed to find any card from among each enemy hand or their own if they prefer and put it with their legion. All cards from this ability that are put in the legion are ready right away."},{"name":"BURN","text":"If this hits a territory, you may eliminate it and this.","detail":"Fixed rule. If a card with this mechanic deals any amount of damage to a territory in battle, the player in control of this can choose to eliminate the damaged territory and the card with this mechanic immediately."},{"name":"CALCULATED","text":"For each enemy, find a drone or mech force in your hand and put it with your legion; it's ready. Each enemey territory takes 100 damage.","detail":"Triggered mechanic. For each enemy, find 1 drone or mech force card in your hand and place it face up with your legion to indicate it's ready. Each enemy territory takes 100 damage."},{"name":"CLOAK","text":"Can't be blocked if it has covert.","detail":"Fixed rule. As long as this card also has the mechanic covert, the cloak mechanic prevents it from being blocked during battle by any other card, even if that card also has this mechanic."},{"name":"CONDEMNING EVIDENCE","text":"Gain 1 intel. A specific opponent loses 1 morale.","detail":"Triggered mechanic. When this triggers, the player in control of a card with this mechanic gains 1 intel and an enemy player loses 1 morale."},{"name":"COVERT","text":"Enemies can't specify this.","detail":"Fixed rule. Cards with this mechanic prevent it from being specified, which means that a card mechanic or rule that uses the word \"specific\" in its description can't apply to cards with this mechanic. It can also not be specified for attack during the attack phase."},{"name":"CRACK SHOT","text":"Hits first in battle.","detail":"Fixed rule. During battle, cards with this mechanic deal their attack value as damage before the enemy card, instead of the normal simultaneous damage. If an enemy card that blocks this also has this mechanic it would be as if neither force has this mechanic."},{"name":"CRAFT","text":"Find a non-soldier force or innovation intel in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a non-soldier force or innovation subtype intel card in your arsenal, show it to all players, and then place it in your hand. Shuffle your arsenal."},{"name":"CULL","text":"For each enemy, specifiy a territory and a force in their legion. Their controller eliminates them or all other non-leader cards in their legion.","detail":"Triggered mechanic. Specify a territory and a force card in each enemy legion. The player in control of the specified cards chooses to eliminate them, or all other cards in their legion, except their leader. (This includes forces, buildings, WMD, morale, intel, territories, and unspent resources)."},{"name":"CUNNING","text":"All soldier forces in your legion have a 2x attack value for each enemy and up to 4 of them are unblockable this turn.","detail":"Triggered mechanic. All soldier forces in your legion gain 2x their attack value for each enemy player in the game. For example if there are 2 enemy players, your soldier forces gain 4x their attack value, if 3 enemy players, 6x their attack value. This 2x calculation happens at the time of this mechanic being triggered. If another mechanic or rule has already changed the attack value, that is the value that will be used in the calculation for this mechanic when it is triggered. Then those soldier forces are unblockable, meaning enemy forces are not allowed to block those soldier forces. Other forces are still blockable."},{"name":"CYCLE","text":"Each enemy returns a card from their legion to their hand, discards a card, then draws a card.","detail":"Triggered mechanic. Each enemy player returns a card of their choice to their hand, then discards a card of their choice, and finally draws a card."},{"name":"DARK","text":"Up to 2 forces have stealth this turn.","detail":"Triggered mechanic. When this ability triggers the controller is allowed to select two forces of any type that can have 'stealth' this turn. Stealth provides this 'Can't be blocked by forces without stealth.' Once this turn is over those forces will lose stealth."},{"name":"DEAD MAN","text":"If eliminated, eliminate the cause.","detail":"Fixed rule. Cards with this mechanic eliminate the card or cards that caused its elimination, including a leader card if that leader is compromised."},{"name":"DECAY","text":"A specific enemy takes control of this; it can't attack or block.","detail":"Triggered mechanic. A specific enemy player gains control of the card, irrespective of their desire. Once transferred, the card cannot attack or block in battle. Decay and Mole are mutually exclusive on a card. The mechanic activates only for the card's original owner. Upon Decay's activation, the card is considered eliminated, and its remaining abilities retrigger under the new controller's ownership. Importantly, Decay does not trigger if the current controller is not the original owner of the card."},{"name":"DEFECT","text":"Discard a card. If you do, a specific enemy shows you their hand; discard a force from it to your hand; enemies cant' specifiy your discard pile until your next turn.","detail":"Triggered mechanic. Discard a card from your hand. If you do, choose an enemy player and look at their hand. Discard a force card from their hand, and put it in your hand. Enemy players can't specify your discard pile until your next turn."},{"name":"DELIVER","text":"Find up to 3 unique army forces or intel in your hand; put them with your legion; they're ready.","detail":"Triggered mechanic. Find 3 unique army-type forces or intel cards in your hand. They can be any mix of those types, but none can be the same titled card. Put all 3 with your legion, skipping their resource costs, and they're ready, meaning skipping their cost timers."},{"name":"DEMO","text":"Eliminate a specific enemy building.","detail":"Triggered mechanic. At the time this mechanic is triggered, you choose an enemy building to eliminate and it is eliminated."},{"name":"DEPART","text":"Discard this.","detail":"Triggered mechanic. At the time this mechanic is triggered, discard the card with this mechanic. Mechanics trigger in order from the top of the card body to the bottom. Any mechanics below this mechanic will not trigger as the card with this mechanic will be discarded before other mechanics can trigger."},{"name":"(X) : DEPLOY : (TYPE)","text":"Find (X) (type text) in your arsenal, show [it|them], and put [it|them] in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find (X) number of (type or subtype) from your arsenal, show them to all enemy players, and put them in your hand. Shuffle your arsenal."},{"name":"DETECTED MOTION","text":"Enemy legions lose blitz.","detail":"Fixed rule. Each enemy force card with the mechanic blitz no longer has blitz from the moment this fixed rule takes effect."},{"name":"DIGNIFY","text":"Gain 1 morale.","detail":"Triggered mechanic. Gain 1 morale."},{"name":"DISABLED","text":"Eliminate a specific enemy non-soldier force without stealth, an attack value < 100, and a turn cost < 2.","detail":"Triggered mechanic. You eliminate a specific enemy card in the war zone that is not a solider, does not have the mechanic stealth, has an attack value less than 100 (not including 100), and a turn cost less than 2 (not including 2)."},{"name":"DRAFT","text":"Find a non-drone soldier force in your hand and put it with your legion.","detail":"Triggered mechanic. Find a non-drone soldier force card in your hand and put it with your legion, obeying any cost timer on the chosen force card."},{"name":"DRAW A CARD","text":"","detail":"Triggered mechanic. Draw an additional 1 card when the card with this mechanic is ready in the war zone."},{"name":"DRAW (X) CARDS","text":"","detail":"Triggered mechanic. Draw an additional (X) cards when the card with this mechanic is ready in the war zone."},{"name":"DRAW A CARD PER TURN","text":"","detail":"Triggered mechanic. Draw an additional 1 card when the card with this mechanic is ready in the war zone, and at any point during the play phase for each following turn the card with this mechanic is in the war zone."},{"name":"DRAW (X) CARDS PER TURN","text":"","detail":"Triggered mechanic. Draw an additional (X) cards when the card with this mechanic is ready in the war zone, and at any point during the play phase for each following turn the card with this mechanic is in the war zone."},{"name":"EMP","text":"If an air force blocks this, eliminate it.","detail":"Fixed rule. If the card with this mechanic is blocked by an air force card, that card is eliminated before damage is exchanged."},{"name":"ENDED","text":"If this hits a leader or soldier force, eliminate it.","detail":"Fixed rule. If the card with this mechanic is able to deal damage to a leader or soldier force card that card is eliminated, even if the card that has this mechanic is eliminated."},{"name":"EPIDEMIC","text":"For each enemy, non-drone soldier forces in their legion are infected forces; they lose 5 morale.","detail":"Triggered mechanic. Non-drone soldier forces in enemy legions become the infected subtype. Enemy players lose 5 morale."},{"name":"EXPERIMENT","text":"If a non-soldier froce was put into your discard this turn, gain 1 intel and draw a card.","detail":"Triggered mechanic. If a non-drone soldier type card was put into your discard during your turn before this ability is triggered, gain 1 intel and draw a card when this ability is triggered."},{"name":"EXPOSED","text":"For each enemy, look at the top 4 cards of their arsenal and put 1 with your legion; it's ready; discard the rest. THey lose 4 morale. This is exalted.","detail":"Triggered mechanic. Look at the top 4 cards of each enemy arsenal; choose 1 and put it with your legion face up to indicate it's ready, and discard the rest of the cards seen but not chosen. The enemy player whose arsenal has been looked at loses 4 morale. This card becomes exalted."},{"name":"ECHO","text":"Repeat triggered abilities on this.","detail":"Triggered mechanic. Repeat any other mechanics on the card that are considered a triggered mechanic."},{"name":"ECOSYSTEM","text":"Produce 1 extra resource if this has > 200 health or there is a clear weather in the war zone.","detail":"Fixed rule. Produce 1 extra resource of the type listed on this card if it has more than 200 health or there is a weather with the clear subtype in the war zone."},{"name":"ENGINEERED SCANDAL","text":"Each enemy loses 9 morale. You can't attack this turn.","detail":"Triggered mechanic. Each enemy loses 9 morale. You're not allowed to attack the same turn this mechanic is triggered."},{"name":"EVADE","text":"Takes no damage during battle.","detail":"Fixed rule. When a card with this mechanic attacks or blocks during battle, it takes no damage from enemy forces no matter how large their attack value is as long as the player's card has this mechanic at the time of damage exchange. This rule only applies to damage, it does not include elimination as elimination is not damage."},{"name":"(X) : EVACUATE : (TYPE)","text":"Put up to (X) specific (type text) from your legion in your hand.","detail":"Triggered mechanic. Choose up to (X) specific (type or subtype) force cards in your legion, and place them in your hand."},{"name":"EXECUTE","text":"Eliminate the card this is attached to.","detail":"Triggered mechanic. If the card that has this mechanic is attached to another card at the time of this mechanic triggering, eliminate the card it is attached to."},{"name":"FEAR","text":"When this attacks, its enemy loses 1 morale.","detail":"Triggered mechanic. When a card with this mechanic attacks, the enemy player whose card is specified for attack loses 1 morale. This morale loss happens immediately after the exchange of damage, after an eligible target is specified and any blocker is declared."},{"name":"FINAL SAY","text":"If eliminated, the cause takes 100 damage.","detail":"Triggered mechanic. A card with this mechanic deals 100 damage to the card that caused its elimination, including a leader card if it's compromised."},{"name":"FINEST","text":"Hits first and before crack shot in battle.","detail":"Fixed rule. During battle, cards with this mechanic deal their attack value as damage before the enemy card even if the blocking card has crack shot, instead of the normal simultaneous damage. If an enemy card that blocks this also has this mechanic it would be as if neither force has this mechanic."},{"name":"FURY","text":"Each enemy's top 15 cards from their arsenal are eliminated.","detail":"Fixed rule. Each enemy's top 15 cards from their arsenal are eliminated by this mechanic."},{"name":"GALVANIZE","text":"Gain 1 morale for each morale card you've played this turn, up to 7.","detail":"Triggered mechanic. Gain 1 morale for each morale type card you've played this turn before triggering this mechanic, up to a maximum of 7."},{"name":"GHOST","text":"Enemeis can't eliminate this if you have 5 forces with ghost in your legion. Only 1 instance of this per legion.","detail":"Fixed rule. If there are exactly 5 forces with this mechanic in your legion, enemy players can't eliminate cards with this mechanic in your legion. There can only be 1 uniquely titled card with this mechanic in each player's legion. If a second copy of a card with this mechanic enters a player's legion, its controller chooses which copy to eliminate."},{"name":"GUARD","text":"Returns after battle.","detail":"Fixed rule. A card with this mechanic turns to face the player controlling it immediately after the battle phase, before the next player starts their turn, and is not considered returning."},{"name":"GRAVE ROB","text":"Find up to 3 non-drone soldier forces in a specific enemy discard and put them in your discard.","detail":"Triggered mechanic. Choose up to 3 non-drone soldier force cards in an enemy discard pile, and place them in your discard pile."},{"name":"GRIND","text":"Eliminate a non-drone soldier force in your legion. If you do, gain 1 (POWER).","detail":"Triggered mechanic. Eliminate a non-drone soldier force card in your legion. If you do, attach 1 power resource from the resource bank to this card."},{"name":"GRIT","text":"Weather can no longer affect your cards this turn.","detail":"Fixed rule. Weather cards don't affect your cards this turn. This will only apply after the point that the card with this mechanic triggers this mechanic. If the weather card in the war zone prevented resources from being produced they will now produce."},{"name":"HEAL","text":"Find up to 6 non-drone soldier forces in your discard, show them, and put them in your arsenal. Shuffle your arsenal.","detail":"Triggered mechanic. Choose up to 6 non-drone soldier force cards in your discard pile, show them to all enemy players, place them on top of your arsenal, and then shuffle your arsenal."},{"name":"HEIST","text":"For each enemy, take control of a specific territory in their legion.","detail":"Triggered mechanic. For each enemy player in the game you can take control of a territory that can be specified in their legion."},{"name":"HIGH YIELD","text":"Produce 1 extra resource.","detail":"Triggered mechanic. Produce 1 extra resource of a type listed on this card."},{"name":"HIJACK","text":"Take control of a specific non-soldier force without stealth, an attack value < 100, and a turn cost < 2.","detail":"Triggered mechanic. You choose a specific enemy card in the war zone that is not a solider. The specified card cannot have the mechanic stealth, must have an attack value less than 100 (not including 100), and a turn cost less than 2 (not including 2). You take control of that card and it's placed in your legion."},{"name":"HYPERSONIC","text":"Not affected by anti-air.","detail":"Fixed rule. Cards with the mechanic anti-air can't use anti-air against the card with this mechanic."},{"name":"HYPERSONIC STRIKE","text":"For each enemy, a specific territory takes 350 damage, a specific territory takes 100 damage, 2 other territories each take 50 damage.","detail":"Triggered mechanic. For each enemy player in the game a specific territory takes 350 damage. Then, a specific territory, which can be the same as the one affected by the first 350 damage takes 100 damage. Two other specific territories each take 50 damage. You decide which of the up to 4 territories take which damage."},{"name":"IMMUNE","text":"Not affected by ashes.","detail":"Fixed rule. This card is not eliminated when the mechanic ashes is triggered."},{"name":"IMPOSTER","text":"Use an ability another leader has.","detail":"Triggered mechanic. Copy any single triggered mechanic another leader card has in the game. This can include faster triggered mechanics or slower ones. Leaders in the sideboard of any active player are considered accessible to IMPOSTER as they are considered in the game, any active leader or leader in a sideboard are allowed to be accessed. If the specified leader is not in a sideboard or an active leader in the game then IMPOSTER has no effect."},{"name":"INSIGHT","text":"Gain 1 Intel. Draw a card.","detail":"Triggered mechanic. Gain 1 intel. Draw a card."},{"name":"INTELLIGENCE","text":"For each enemy, 2 territories or 3 if you have the most intel, each take 50 damage per intel card in your discard pile.","detail":"Triggered mechanic. For each enemy player in the game, 2 of their specific territories (or 3 of their specific territories if you have the most intel among players) each take 50 damage for each intel card in your discard pile at the time this mechanic is triggered. The territories this ability impacts must be specifiable at the time the ability is triggered."},{"name":"INVENT","text":"Find an army force or intel in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is either an army force or an intel card and put it into your hand after showing it to your opponent; then shuffle your arsenal."},{"name":"JET","text":"Find a specific air force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of air and show it to other players in the game, after which put it with your legion. Then shuffle your arsenal."},{"name":"JOIN","text":"Each non-drone soldier force you own is a ninja force until your next turn.","detail":"Triggered mechanic. Each non-drone soldier force card you own has the ninja subtype until the start of your next turn."},{"name":"KEEN","text":"Not affected by crack shot.","detail":"Fixed rule. The crack shot mechanic can't affect cards with this mechanic."},{"name":"LAUNCH","text":"A specific enemy territory, building, or leader takes damage equal to the attack value.","detail":"Triggered mechanic. The card with this mechanic has an attack value. At the time this mechanic is triggered the attack value is dealt as damage to a specific enemy territory, building, or leader. You can't deal this damage do a leader unless that leader is compromised."},{"name":"LOCKOUT","text":"Each player draws a card from the bottom of their arsenal, then each enemy discards a card from their hand to the bottom of their arsenal.","detail":"Triggered mechanic. Each player draws the bottom card of their arsenal, then enemy players discard a card of their choice, placing it facedown on the bottom of their arsenal instead of in their discard pile."},{"name":"LOYALTY","text":"Draw 2 cards.","detail":"Triggered mechanic. Draw 2 cards."},{"name":"MELTDOWN","text":"A specific power territory is eliminated.","detail":"Triggered mechanic. A specific territory that is capable of producing power resources is eliminated. This does not have to be an enemy territory."},{"name":"MOLE","text":"A specific enemy takes control of this and it must attack each turn.","detail":"Triggered mechanic. A specific enemy player gains control of the card, irrespective of their desire. Once transferred, the card must attack in battle if able. Mole and Decay are mutually exclusive on a card. The mechanic activates only for the card's original owner. Upon Mole's activation, the card is considered eliminated, and its remaining abilities retrigger under the new player's control. Importantly, Mole does not trigger if the current controller is not the original owner of the card."},{"name":"NAVY","text":"Find a specific navy force in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of navy and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"NUCLEAR","text":"For each enemy, eliminate a specific territory; 2 of their others each take 50 damage.","detail":"Triggered mechanic. For each enemy player in the game, eliminate a specific territory and 2 of their other territories each take 50 damage."},{"name":"NUCLEAR DETONATION","text":"Eliminate a specific enemy territory; 2 of their others each take 50 damage and can't produce on their next turn.","detail":"Triggered mechanic. For a specific enemy player in the game, eliminate a specific territory in their legion and 2 of their other territories each take 50 damage. The damaged territories can't produce on their next turn."},{"name":"OFFICER","text":"Officers you play cost (GENERIC) and are ready. When you play an officer, return this to your hand.","detail":"Triggered mechanic. Officer subtype cards you play cost 1 generic resource instead of their normal resource cost, and are ready instead of their normal cost timer. When you play another officer subtype card, place the card with this mechanic in your hand."},{"name":"ORBITAL RAILGUN","text":"Each enemy territory takes 200 damage. You can't attack this turn.","detail":"Triggered mechanic. Each enemy territory in the game takes 200 damage. When you use this mechanic you can't attack on the same turn it's used."},{"name":"OUTMATCH","text":"Can't be blocked by forces < rank 3.","detail":"Fixed rule. A card with this mechanic can't be blocked in battle by forces of rank 1 or 2."},{"name":"OUT OF RANGE","text":"Not affected by pick-off.","detail":"Fixed rule. A card with this mechanic can't be specified for the pick-off mechanic."},{"name":"PATROL","text":"Each battle, a specific enemy soldier or army force loses stealth.","detail":"Triggered mechanic. This triggers during the beginning of each battle. Choose a specific enemy soldier or army force and it loses stealth for the rest of the turn."},{"name":"PICK-OFF","text":"Eliminate a specific enemy force this could block in battle.","detail":"Triggered mechanic. A specific enemy force is eliminated. The specified force must be a force the card with this mechanic is able to block in normal battle."},{"name":"PILFER","text":"Draw a card from a specific enemy arsenal.","detail":"Triggered mechanic. Choose an enemy arsenal and draw the top card from it to your hand."},{"name":"PIRATE","text":"Take a specific unspent resource from an enemy or gain 1 (GENERIC).","detail":"Triggered mechanic. You can choose any unspent resource from an enemy card and take it, attaching it to the card with this mechanic. If there are no unspent resources to take, you can instead gain 1 generic resource."},{"name":"PREPARED","text":"Not affected by enemy WMD.","detail":"Fixed rule. Cards with this mechanic can't be affected by enemy WMD cards and their mechanics."},{"name":"PROTECT","text":"If a soldier force in your legion would be eliminated in battle, you may eliminate this instead.","detail":"Triggered mechanic. If a soldier force card in your legion would be eliminated in battle after attack values are simultaneously traded, you can eliminate a card with this mechanic instead, as long as the card with this mechanic would not also be eliminated in battle."},{"name":"PSYCHE","text":"Find a specific morale card in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Choose a morale type card in your arsenal, show it to all enemy players, place it in your hand, and then shuffle your arsenal."},{"name":"PULL","text":"Find a specific drone or mech force in your arsenal, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Choose a drone or mech subtype force in your arsenal, show it to all enemy players, place it in your hand, and then shuffle your arsenal."},{"name":"PUSH","text":"Find a specific drone force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal that is a force type card with a subtype of drone and show it to other players in the game, after which put it with your legion. Then shuffle your arsenal."},{"name":"RAID","text":"When this attacks, its enemy discards a card.","detail":"Triggered mechanic. When a card with this mechanic attacks, the enemy player whose card is specified for attack discards a card of their choice from their hand. This discard happens immediately after the exchange of damage, after an eligible target is specified and any blocker is declared."},{"name":"RANSOM","text":"Take control of a specific force with a turn cost < 2; turn it facedown. The owner must pay 1 resource to regain control on their next turn or eliminate it.","detail":"Triggered mechanic. You choose a specific enemy force card they control in the war zone with a turn cost < 2. You take control of that card and place it facedown in your legion attached to the card with this mechanic. The owner may pay 1 resource of any type to you to regain control of it at any point on their next turn. If they don't, eliminate it at the end of their turn. If they pay you, the card control is regained and ready once again in the war zone. Resources paid to you are attached to the card with this mechanic and can be spent normally. If you are the original owner of the card that RANSOM is used to specify then you can pay the resource cost on your next turn instead of the enemy you used RANSOM from, resulting in you regaining control of your original card."},{"name":"RAVAGE & FEAR","text":"For each enemy, eliminate a specific territory in their legion; they lose 3 more morale.","detail":"Triggered mechanic. For each enemy player in the game, eliminate a specific territory. Each enemy who loses a territory also loses 3 morale in addition to any morale loss triggered by the elimination of the territory."},{"name":"RECALL","text":"Flip a specific enemy non-soldier force with a turn cost < 2 facedown and add a cost timer of 1; it's not ready.","detail":"Triggered mechanic. You choose a specific enemy non-soldier force card in the war zone that has a turn cost of less than 2. Turn it facedown and add a cost timer of 1."},{"name":"RECLAIM","text":"Find a specific discarded non-soldier force or innovation intel, show it, and put it in your hand.","detail":"Triggered mechanic. Choose a non-soldier force type or innovation subtype intel card in any player's discard pile, show it to all players, and place it in your hand."},{"name":"RECON","text":"Look at the top 4 cards of your arsenal, then put them back in any order. Draw a card.","detail":"Triggered mechanic. Look at the top 4 cards of your arsenal and put them back in any order. If you have fewer than 4 cards, arrange the remaining cards in any order. Draw a card."},{"name":"RE-EDUCATE","text":"Take control of a specific non-drone soldier force without stealth and an attack value < 60.","detail":"Triggered mechanic. You choose a specific enemy card with the subtype soldier that is not subtype drone. The specified card cannot have the mechanic stealth, and must have an attack value less than 60 (not including 60). You take control of that card and it's placed in your legion."},{"name":"REIGN","text":"For each enemy, find 2 unique forces in your discard; put them with your legion; they're ready.","detail":"Triggered mechanic. For each enemy player, choose 2 uniquely titled force type cards in your discard pile, and place them with your legion faceup to indicate they're ready."},{"name":"REPAIR","text":"Remove 30 damage from each territory, building, and leader in your legion.","detail":"Triggered mechanic. Remove 30 damage from all territories, buildings, and leaders in your legion."},{"name":"RESTORE","text":"Find a specific discarded non-soldier force, show it, and put it with your legion if you pay its resource costs using any resource.","detail":"Triggered mechanic. Choose a non-solder force type card in any player's discard pile, show it to all players, and put it in your legion if you pay any resource at a 1-to-1 ratio for each resource in its resource cost header. Obey any cost timers in that card's cost header."},{"name":"RESTORATION","text":"For each enemy, restore 1 of your eliminated territories. Gain 2 morale; this is uncompromised.","detail":"Triggered mechanic. For each enemy, turn 1 one of your eliminated territories faceup. These territories have full health. You gain 2 morale, but any morale lost from the original elimination is not re-gained. If the leader that has this mechanic was compromised, it is no longer compromised."},{"name":"REVENGE","text":"Each enemy's top 25 cards from their arsenal are eliminated. You can't attack this turn.","detail":"Triggered mechanic. For each enemy, move the top 25 cards from their arsenal to their discard pile. You can't attack this turn."},{"name":"RIPPLE","text":"Each battle, a specific enemy navy force loses stealth.","detail":"Triggered mechanic. This triggers during the beginning of each battle. Choose a specific enemy navy type force and it loses stealth for the rest of the turn."},{"name":"RUIN","text":"Eliminate a specific enemy territory.","detail":"Triggered mechanic. Choose a territory in any legion and eliminate it."},{"name":"SALVAGE","text":"Put a specific non-soldier force from an enemy discard into your discard.","detail":"Triggered mechanic. Choose a non-soldier force type card in an enemy discard pile and place it in your discard pile."},{"name":"SCRAP","text":"For each eliminated territory, gain 1 (GENERIC).","detail":"Triggered mechanic. For each eliminated territory in each legion, gain 1 generic resource from the resource bank and attach it to this card."},{"name":"SEARCH","text":"Find a specific card in your arsenal and place it on top after you shuffle your arsenal.","detail":"Triggered mechanic. Find a specific card in your arsenal. Shuffle your arsenal, then put this card on top of your arsenal."},{"name":"SEEK","text":"Enemy legions lose stealth.","detail":"Fixed rule. Each enemy card with the stealth mechanic no longer has the stealth mechanic while this mechanic is in effect."},{"name":"SETUP","text":"This can't produce on your first turn.","detail":"Fixed rule. This card can't produce on your first turn of the game."},{"name":"SHATTER","text":"Each enemy building takes 150 damage. Each enemy territory takes 100 damage.","detail":"Triggered mechanic. Each building type card in an enemy player's legion takes 150 damage. Each territory type card in an enemy player's legion takes 100 damage."},{"name":"SHOCK","text":"A specific building or territory takes 140 damage.","detail":"Triggered mechanic. Choose a building or territory type card in any legion and it takes 140 damage."},{"name":"SHOW OF FORCE","text":"All enemies lose 1 morale for each air force in your legion.","detail":"Triggered mechanic. All enemies lose 1 morale for each air force in your legion."},{"name":"SHUT OFF","text":"A specific enemy can't produce fuel resources on their next turn.","detail":"Triggered mechanic. Choose an enemy; any cards in their legion that can produce fuel resources can't do so on that player's next turn."},{"name":"SLAUGHTER","text":"Eliminate a territory in your legion. For each enemy, eliminate up to 2 specific territories in their legion. You can't attack this turn.","detail":"Triggered mechanic. Choose a territory in your legion and eliminate it. For each enemy, choose up to 2 territories in their legion and eliminate them. You can't attack this turn. (If you have no territories to eliminate in your legion, the rest of this ability still triggers)."},{"name":"SOLO","text":"Can't be attached to other cards.","detail":"Fixed rule. A card with this mechanic can't be chosen to be attached to other cards."},{"name":"SPARK","text":"If an enemy controls a power territory gain 1 (POWER).","detail":"Triggered mechanic. If an enemy controls a territory with the power subtype, gain 1 power resource from the resource bank and attach it to this."},{"name":"SPENT","text":"Eliminate this.","detail":"Triggered mechanic. Eliminate this card as soon as this mechanic is triggered."},{"name":"SPOT","text":"Each battle, a specific enemy air force loses stealth.","detail":"Triggered mechanic. This triggers during the beginning of each battle. Choose a specific enemy air type force and it loses stealth for the rest of the turn."},{"name":"SPREAD","text":"Attach this to a non-drone, non-infected solider force in your legion; it's an infected force for the rest of the game. You lose 1 morale.","detail":"Triggered mechanic. Attach this to a non-drone, non-infected soldier type force card in your legion, and it gains the infected subtype for the rest of the game. Lose 1 morale."},{"name":"STEALTH","text":"Can't be blocked by forces without stealth.","detail":"Fixed rule. Only cards with stealth can block this card. If this card is blocked, normal battle rules apply."},{"name":"STUN","text":"Flip a specific enemy force this could block with a turn cost < 2 facedown and add a cost timer of 1; it's not ready.","detail":"Triggered mechanic. Choose an enemy force type card with a cost timer of 0 or 1 that this card could block in battle, flip it facedown to indicate it's not ready, and add a cost timer of 1 to it."},{"name":"SUB ATTACK","text":"For each enemy, eliminate a specific territory. Up to 4 sub forces in your legion have stealth this turn.","detail":"Triggered mechanic. For each enemy, choose a territory and eliminate it. Choose up to 4 force cards with the sub subtype in your legion, and they gain stealth for the rest of the turn. (STEALTH: Can't be blocked by forces without stealth.)."},{"name":"SUBS","text":"Find a specific sub force in your arsenal, show it, and put it with your legion. Shuffle your arsenal.","detail":"Triggered mechanic. Find a force type card in your arsenal with the sub subtype, show it to all players, and put it with your legion, obeying any cost timers on it. Shuffle your arsenal."},{"name":"SUBVERT","text":"Each enemy discards 2 cards.","detail":"Triggered mechanic. Each enemy chooses two cards from their hand and discards them."},{"name":"SUPPLY","text":"Produce 2 extra resources on your first turn.","detail":"Triggered mechanic. During the produce phase of your first turn, this card produces 2 extra resources of the type listed on the card. This ability only produces an extra 2 resources total for the entire game."},{"name":"SURPLUS","text":"Gain 2 (GENERIC).","detail":"Triggered mechanic. Attach 2 generic resources to this card."},{"name":"SURVEIL","text":"A specific enemy shows you their hand.","detail":"Triggered mechanic. Choose an enemy player and they show you the cards in their hand."},{"name":"SUSPEND","text":"A specifc enemy can't produce generic resources on their next turn.","detail":"Triggered mechanic. Choose an enemy player; cards in their legion that could produce generic resources can't do so on their next turn."},{"name":"SWAMPED","text":"Increase a specific enemy non-leader, non-territory timer by 1.","detail":"Triggered mechanic. Choose a countdown or cost timer in an enemy player's legion that isn't on a leader or territory type card and increase it by 1."},{"name":"TACTICAL STRIKE","text":"A specific enemy force, building, or territory takes 300 damage.","detail":"Triggered mechanic. Choose a force, building, or territory type card in an enemy player's legion and it takes 300 damage."},{"name":"TAX","text":"Lose 3 morale. Gain 5 (GENERIC).","detail":"Triggered mechanic. Lose 3 morale. Gain 5 generic resources. (If you have less than 3 morale, the rest of this mechanic still triggers)."},{"name":"TEMPER","text":"For each enemy, eliminate a specific territory, or 2 if you have > 50 morale.","detail":"Triggered mechanic. Choose a territory in each enemy player's legion and eliminate it. If you have more than 50 morale, choose another territory in each enemy player's legion and eliminate it."},{"name":"TERRITORIAL","text":"Eliminate all other supplier forces.","detail":"Triggered mechanic. When this card becomes ready in the war zone, eliminate all other supplier forces from the war zone."},{"name":"UNVEIL","text":"Look at the top card of a specific arsenal.","detail":"Triggered mechanic. Choose any player's arsenal and look at the top card."},{"name":"VOW","text":"Find a specific ninja force in your arsenal or discard, show it, and put it in your hand. Shuffle your arsenal.","detail":"Triggered mechanic. Find a card in your arsenal or discard pile that is a force type card with a subtype of ninja and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"WEATHER","text":"Find a specific weather in your arsenal, show it, and put it in your hand.","detail":"Triggered mechanic. Find a card in your arsenal that is a weather card and show it to other players in the game, after which put it into your hand. Then shuffle your arsenal."},{"name":"WEATHERPROOF","text":"Not affected by weather.","detail":"Fixed rule. Cards with this mechanic can't be affected by weather cards and their mechanics."},{"name":"WORK STOP","text":"A specific enemy can't produce equipment resources on their next turn.","detail":"Triggered mechanic. You choose 1 enemy. That enemy cannot produce equipment resources during any stage of their next turn."},{"name":"X10","text":"For each enemy, eliminate a specific territory in their legion and draw 2 cards; for each card drawn, shuffle 2 cards from your discard into your arsenal.","detail":"Triggered mechanic. Choose a territory type card in each enemy player's legion, eliminate it, and draw 2 cards. For each card you draw, choose 2 cards in your discard pile and put them on top of your arsenal, then shuffle your arsenal."}],"edges":[["ANTI-NAVAL","NAVY","references"],["ARMADA","NAVY","references"],["ARMORED","DEAD MAN","counters"],["ARMORED","PICK-OFF","counters"],["AWE","STEALTH","references"],["BEAM","EVADE","references"],["BOW","NAVY","references"],["CLOAK","COVERT","counters"],["DARK","STEALTH","counters"],["DECAY","MOLE","references"],["DETECTED MOTION","BLITZ","references"],["DISABLED","STEALTH","references"],["EXPERIMENT","DRAW A CARD","references"],["ECOSYSTEM","WEATHER","references"],["FINEST","CRACK SHOT","references"],["GRIT","WEATHER","references"],["HIJACK","STEALTH","references"],["HYPERSONIC","ANTI-AIR","counters"],["IMMUNE","ASHES","counters"],["INSIGHT","DRAW A CARD","references"],["KEEN","CRACK SHOT","counters"],["MOLE","DECAY","references"],["OUT OF RANGE","PICK-OFF","counters"],["PATROL","STEALTH","references"],["PILFER","DRAW A CARD","references"],["RANSOM","SPENT","references"],["RECON","DRAW A CARD","references"],["RE-EDUCATE","STEALTH","references"],["RESTORATION","RESTORE","references"],["RIPPLE","STEALTH","references"],["RIPPLE","NAVY","references"],["SEEK","STEALTH","references"],["SPOT","STEALTH","references"],["SUB ATTACK","STEALTH","counters"],["WEATHERPROOF","WEATHER","counters"]],"cardKeywords":{"001-044":["DEAD MAN"],"001-045":["CRACK SHOT","STEALTH","PICK-OFF"],"001-047":["ANTI-AIR"],"001-053":["ARMORED"],"001-055":["ARMORED","ANTI-AIR","BLITZ"],"001-056":["ARMORED","BLITZ","PICK-OFF"],"001-057":["BLITZ"],"001-058":["BLITZ","STEALTH"],"001-060":["PATROL"],"001-080":["BOMBS"],"002-100":["ANTI-GROUND"],"001-200":["ENDED","EVADE","STEALTH"],"001-018":["NUCLEAR DETONATION"],"001-019":["ASHES"],"001-233":["SUPPLY"],"001-131":["SEEK"],"001-052":["STEALTH"],"001-031":["STEALTH"]},"coOccurrences":[["ARMORED","BLITZ",2],["CRACK SHOT","STEALTH",1],["CRACK SHOT","PICK-OFF",1],["PICK-OFF","STEALTH",1],["ANTI-AIR","ARMORED",1],["ANTI-AIR","BLITZ",1],["ARMORED","PICK-OFF",1],["BLITZ","PICK-OFF",1],["BLITZ","STEALTH",1],["ENDED","EVADE",1],["ENDED","STEALTH",1],["EVADE","STEALTH",1]]};

// Functions over SYN
function getSynKeyword(name) {
return SYN.keywords.find(k => k.name === name);
}
function getEdgesFor(keyword, rel = null) {
return SYN.edges.filter(e => (e[0] === keyword || e[1] === keyword) && (rel === null || e[2] === rel));
}
function getCardsWithKeyword(keyword) {
return Object.entries(SYN.cardKeywords)
.filter(([id, kws]) => kws.includes(keyword))
.map(([id]) => getCard(id))
.filter(c => c);
}
function getCardKeywords(cardId) {
return SYN.cardKeywords[cardId] || [];
}

// Score a keyword combo: how many cards have it, how many references between
// them, and an “exotic” bonus for rare combos
function scoreCombo(kwA, kwB) {
// Find cards that have both
const cardsWithBoth = Object.entries(SYN.cardKeywords)
.filter(([id, kws]) => kws.includes(kwA) && kws.includes(kwB))
.map(([id]) => id);

// Check for explicit references between them in the rules text
const refs = SYN.edges.filter(e =>
(e[0] === kwA && e[1] === kwB) || (e[0] === kwB && e[1] === kwA)
);

const hasCounters = refs.some(e => e[2] === 'counters');
const hasReferences = refs.length > 0;

// Co-occurrence count from precomputed
const coEntry = SYN.coOccurrences.find(c =>
(c[0] === kwA && c[1] === kwB) || (c[0] === kwB && c[1] === kwA)
);
const coCount = coEntry ? coEntry[2] : 0;

return {
pair: [kwA, kwB],
cardsWithBoth,
coCount,
hasReferences,
hasCounters,
score: coCount * 10 + (hasReferences ? 5 : 0) - (hasCounters ? 8 : 0),
};
}

// Card-level synergy score: keyword count + bonus for known good pairs
function scoreCardSynergy(cardId) {
const kws = getCardKeywords(cardId);
if (kws.length === 0) return { score: 0, breakdown: [] };
let score = kws.length * 5;
const breakdown = kws.map(k => ({ keyword: k, points: 5 }));

// Check pairwise: bonus for documented synergies
for (let i = 0; i < kws.length; i++) {
for (let j = i+1; j < kws.length; j++) {
const combo = scoreCombo(kws[i], kws[j]);
if (combo.hasReferences && !combo.hasCounters) {
score += 3;
breakdown.push({ pair: [kws[i], kws[j]], points: 3, reason: 'documented synergy' });
}
if (combo.hasCounters) {
score -= 2;
breakdown.push({ pair: [kws[i], kws[j]], points: -2, reason: 'self-counter' });
}
}
}
return { score, breakdown };
}

// ============================================================================
// AI BUILDER TAB v2 — Recipe-First
// ============================================================================
function AITab({ setDeck, setTab, createDeck }) {
const [mode, setMode] = useState('recipe'); // 'recipe' | 'novel' | 'counter'
const recipeLeaders = useMemo(() => getRecipeLeaders(), []);
const enrichedLeaders = useMemo(() => ENRICHED
.filter(e => CARDS.find(c => c.id === e.id && c.type === 'Leader'))
.map(e => getCard(e.id))
.filter(Boolean)
.sort((a, b) => (a.id || '').localeCompare(b.id || '')), []);

// Recipe mode state
const [selectedLeaderId, setSelectedLeaderId] = useState(null);
const [selectedRecipe, setSelectedRecipe] = useState(null);
const [building, setBuilding] = useState(false);
const [resolved, setResolved] = useState(null);

// Novel mode state
const [novelLeaderId, setNovelLeaderId] = useState(null);
const [novelResult, setNovelResult] = useState(null);
const [novelBuilding, setNovelBuilding] = useState(false);

// Counter-meta mode state
const [counterTargetId, setCounterTargetId] = useState(null);
const [counterYourId, setCounterYourId] = useState(null);
const [counterResult, setCounterResult] = useState(null);
const [counterBuilding, setCounterBuilding] = useState(false);

// Leaders eligible to be YOUR leader: must be enriched (so own-synergy scoring works).
// Leaders eligible as TARGET: any leader with at least one recipe OR enrichment.
const recipeLeaderIds = useMemo(() => new Set(recipeLeaders.map(l => l.id)), [recipeLeaders]);
const counterTargetCandidates = useMemo(() => {
const ids = new Set([...enrichedLeaders.map(l => l.id), ...recipeLeaderIds]);
return Array.from(ids).map(id => getCard(id)).filter(Boolean)
.sort((a, b) => (a.id || '').localeCompare(b.id || ''));
}, [enrichedLeaders, recipeLeaderIds]);

const recipesForLeader = selectedLeaderId ? getRecipesForLeader(selectedLeaderId) : [];

const pickRecipe = (recipe) => {
setSelectedRecipe(recipe);
setBuilding(true);
setResolved(null);
setTimeout(() => {
setResolved(resolveRecipe(recipe));
setBuilding(false);
}, 600);
};

const buildNovel = (leaderId) => {
setNovelLeaderId(leaderId);
setNovelBuilding(true);
setNovelResult(null);
setTimeout(() => {
setNovelResult(composeNovelDeck(leaderId));
setNovelBuilding(false);
}, 800);
};

const buildCounter = (yourId, targetId) => {
setCounterYourId(yourId);
setCounterTargetId(targetId);
setCounterBuilding(true);
setCounterResult(null);
setTimeout(() => {
setCounterResult(composeCounterDeck(yourId, targetId));
setCounterBuilding(false);
}, 900);
};

const loadIntoDeckBuilder = () => {
if (!resolved) return;
const title = selectedRecipe?.title || 'AI Deck';
if (createDeck) {
createDeck(title, resolved.deck);
setTab('deck');
} else if (confirm('Replace your current deck with this AI-built deck?')) {
setDeck(resolved.deck);
setTab('deck');
}
};

const loadNovelIntoDeck = () => {
if (!novelResult) return;
const title = `${novelResult.leader.name} — ${novelResult.themes.join('/')}`;
if (createDeck) {
createDeck(title, novelResult.deck);
setTab('deck');
}
};

const loadCounterIntoDeck = () => {
if (!counterResult) return;
const title = `${counterResult.leader.name} vs ${counterResult.target.name}`;
if (createDeck) {
createDeck(title, counterResult.deck);
setTab('deck');
}
};

const reset = () => {
setSelectedLeaderId(null);
setSelectedRecipe(null);
setResolved(null);
setNovelLeaderId(null);
setNovelResult(null);
setCounterTargetId(null);
setCounterYourId(null);
setCounterResult(null);
};

const backToRecipes = () => {
setSelectedRecipe(null);
setResolved(null);
};

const backToNovel = () => {
setNovelLeaderId(null);
setNovelResult(null);
};

const backToCounter = () => {
setCounterTargetId(null);
setCounterYourId(null);
setCounterResult(null);
};

return (
<>
<header className="sticky top-0 z-30 border-b border-white/[0.06]" style={{
background: 'linear-gradient(180deg, rgba(8,15,10,0.94) 0%, rgba(8,15,10,0.99) 100%)',
backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
}}>
<div className="px-4 py-3">
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2">
<div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(204,34,0,0.15)', boxShadow: '0 0 16px rgba(204,34,0,0.3)' }}>
<Sparkles className="h-3.5 w-3.5 text-mil-red" />
</div>
<h1 className="text-xs tracking-[0.25em] text-mil-paper uppercase font-semibold">AI Deck Builder</h1>
</div>
<span className="text-[10px] text-mil-ghost tracking-wider">{ENRICHED.length} ENRICHED · {RECIPES.length} RECIPES</span>
</div>
{/* Mode toggle */}
<div className="grid grid-cols-3 gap-1 p-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
<button onClick={() => { setMode('recipe'); reset(); }} className={`text-[11px] py-2 rounded-md tracking-wider font-bold transition flex items-center justify-center gap-1.5 ${mode === 'recipe' ? 'text-mil-paper' : 'text-mil-fade hover:text-mil-stone'}`}
style={mode === 'recipe' ? { background: 'linear-gradient(180deg, rgba(204,34,0,0.15), rgba(204,34,0,0.05))', boxShadow: '0 0 16px rgba(204,34,0,0.15), inset 0 1px 0 rgba(58,107,39,0.15)' } : {}}>
<Award className="h-3.5 w-3.5" /> RECIPE
</button>
<button onClick={() => { setMode('novel'); reset(); }} className={`text-[11px] py-2 rounded-md tracking-wider font-bold transition flex items-center justify-center gap-1.5 ${mode === 'novel' ? 'text-mil-paper' : 'text-mil-fade hover:text-mil-stone'}`}
style={mode === 'novel' ? { background: 'linear-gradient(180deg, rgba(204,34,0,0.15), rgba(204,34,0,0.05))', boxShadow: '0 0 16px rgba(204,34,0,0.15), inset 0 1px 0 rgba(58,107,39,0.15)' } : {}}>
<Brain className="h-3.5 w-3.5" /> NOVEL
</button>
<button onClick={() => { setMode('counter'); reset(); }} className={`text-[11px] py-2 rounded-md tracking-wider font-bold transition flex items-center justify-center gap-1.5 ${mode === 'counter' ? 'text-rose-200' : 'text-mil-fade hover:text-mil-stone'}`}
style={mode === 'counter' ? { background: 'linear-gradient(180deg, rgba(251,113,133,0.18), rgba(251,113,133,0.05))', boxShadow: '0 0 16px rgba(251,113,133,0.2), inset 0 1px 0 rgba(58,107,39,0.15)' } : {}}>
<Crosshair className="h-3.5 w-3.5" /> COUNTER
</button>
</div>
</div>
</header>

  <main className="px-4 py-4">
    {mode === 'recipe' && (<RecipeMode
      recipeLeaders={recipeLeaders}
      selectedLeaderId={selectedLeaderId} setSelectedLeaderId={setSelectedLeaderId}
      selectedRecipe={selectedRecipe} pickRecipe={pickRecipe}
      recipesForLeader={recipesForLeader}
      resolved={resolved} building={building}
      loadIntoDeckBuilder={loadIntoDeckBuilder}
      reset={reset} backToRecipes={backToRecipes}
    />)}
    {mode === 'novel' && (<NovelMode
      enrichedLeaders={enrichedLeaders}
      novelLeaderId={novelLeaderId}
      novelResult={novelResult} novelBuilding={novelBuilding}
      buildNovel={buildNovel}
      loadNovelIntoDeck={loadNovelIntoDeck}
      backToNovel={backToNovel}
    />)}
    {mode === 'counter' && (<CounterMode
      enrichedLeaders={enrichedLeaders}
      targetCandidates={counterTargetCandidates}
      counterTargetId={counterTargetId} setCounterTargetId={setCounterTargetId}
      counterYourId={counterYourId}
      counterResult={counterResult} counterBuilding={counterBuilding}
      buildCounter={buildCounter}
      loadCounterIntoDeck={loadCounterIntoDeck}
      backToCounter={backToCounter}
    />)}
  </main>
</>

);
}

// ============================================================================
// RECIPE MODE — renders the official recipe path (formerly the entire AITab)
// ============================================================================
function RecipeMode({ recipeLeaders, selectedLeaderId, setSelectedLeaderId, selectedRecipe, pickRecipe, recipesForLeader, resolved, building, loadIntoDeckBuilder, reset, backToRecipes }) {
const teach = useTeach();

if (selectedRecipe && building) {
return (
<div className="py-20 text-center">
<Loader2 className="h-10 w-10 mx-auto text-mil-redbright animate-spin mb-3" style={{ filter: 'drop-shadow(0 0 16px rgba(204,34,0,0.5))' }} />
<div className="text-sm text-mil-paper tracking-wider mt-3 font-bold">RESOLVING RECIPE...</div>
<div className="text-xs text-mil-ghost mt-1">Loading "{selectedRecipe.title}"</div>
</div>
);
}

if (resolved && selectedRecipe) {
return (
<div className="space-y-4">
<button onClick={backToRecipes} className="text-xs text-mil-fade hover:text-mil-red flex items-center gap-1 transition">← BACK TO RECIPES</button>

    <div className="rounded-xl p-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(204,34,0,0.12), rgba(13,26,15,0.85))',
      border: '1px solid rgba(204,34,0,0.3)',
    }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(204,34,0,0.6), transparent)' }} />
      <div className="text-[10px] tracking-[0.2em] text-mil-red/80 mb-1">// OFFICIAL RECIPE</div>
      <div className="text-xl font-bold text-white mb-2">{selectedRecipe.title}</div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {selectedRecipe.themes.map(t => (
          <span key={t} className="text-[11px] tracking-wider px-2 py-0.5 rounded-md" style={{ background: 'rgba(204,34,0,0.12)', border: '1px solid rgba(204,34,0,0.3)', color: '#cc2200' }}>{t}</span>
        ))}
      </div>
      <div className="text-[10px] tracking-wider text-mil-fade">
        {selectedRecipe.mode} · <span className="text-mil-red font-bold">{resolved.total}</span> CARDS
        {' · '}<span className="text-emerald-400">{resolved.choices.filter(c => c.kind === 'fixed').length}</span> FIXED
        {' · '}<span className="text-sky-400">{resolved.choices.filter(c => c.kind === 'filter').length}</span> AI-PICKED
      </div>
    </div>

    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="text-xs font-bold text-mil-paper tracking-wider mb-3">DECK COMPOSITION</div>
      <div className="space-y-2">
        {Object.entries(resolved.byType).sort((a,b) => b[1]-a[1]).map(([type, n]) => {
          const meta = TYPE_META[type] || { color: '#9ca3af' };
          const max = Math.max(...Object.values(resolved.byType), 1);
          return (
            <div key={type}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-mil-stone">{type}</span>
                <span className="text-mil-ghost">{n}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
                <div className="h-full rounded-full" style={{ width: `${(n/max)*100}%`, background: meta.color, boxShadow: `0 0 8px ${meta.glow || 'rgba(0,0,0,0)'}` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="text-xs font-bold text-mil-paper tracking-wider mb-3">CARDS · TAP FOR DETAILS</div>
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {resolved.entries
          .sort((a,b) => {
            const order = ['Leader','Territory','Building','Force','WMD','Intel','Morale','Weather'];
            const ai = order.indexOf(a.card.type), bi = order.indexOf(b.card.type);
            if (ai !== bi) return ai - bi;
            return a.card.name.localeCompare(b.card.name);
          })
          .map(e => {
            const meta = TYPE_META[e.card.type] || { color: '#9ca3af' };
            return (
              <button key={e.card.id} onClick={() => teach.showCard(e.card.id)} className="w-full flex items-center gap-2 text-xs py-1.5 px-2 rounded hover:bg-mil-muted/30 transition text-left">
                <span className="text-[9px] font-bold tracking-wider w-12 flex-shrink-0" style={{ color: meta.color }}>{e.card.type.slice(0,4).toUpperCase()}</span>
                <span className="text-mil-paper flex-1 truncate">{e.card.name}</span>
                {e.card.hasFullData && <span className="text-[8px] text-emerald-400 tracking-wider">DATA</span>}
                <span className="text-mil-red font-bold w-7 text-right">×{e.n}</span>
              </button>
            );
          })
        }
      </div>
    </div>

    <button onClick={loadIntoDeckBuilder} className="w-full py-4 rounded-xl text-mil-paper hover:text-white transition flex items-center justify-center gap-2 font-bold tracking-wider sticky bottom-20" style={{
      background: 'linear-gradient(135deg, rgba(204,34,0,0.25), rgba(204,34,0,0.08))',
      border: '1px solid rgba(204,34,0,0.5)',
      boxShadow: '0 8px 32px rgba(204,34,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
    }}>
      <Layers className="h-4 w-4" /> SAVE AS NEW DECK
    </button>
  </div>
);

}

if (selectedLeaderId) {
return (
<div className="space-y-3">
<button onClick={reset} className="text-xs text-mil-fade hover:text-mil-red flex items-center gap-1 transition">← BACK TO LEADERS</button>
<div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(204,34,0,0.12)' }}>
<Crown className="h-5 w-5 text-mil-red" />
</div>
<div>
<div className="text-base text-white font-medium">{getCard(selectedLeaderId)?.name}</div>
<div className="text-[10px] text-mil-ghost tracking-wider">CHOOSE A DECK STRATEGY</div>
</div>
</div>
</div>
<div className="space-y-2">
{recipesForLeader.map(r => (
<button key={r.title} onClick={() => pickRecipe(r)} className="w-full text-left rounded-xl overflow-hidden transition group" style={{
background: 'linear-gradient(135deg, rgba(253,224,71,0.04), rgba(13,26,15,0.7))',
border: '1px solid rgba(255,255,255,0.06)',
}}>
<div className="p-3 flex items-start justify-between gap-2">
<div className="flex-1 min-w-0">
<div className="text-sm text-white font-medium">{r.title}</div>
<div className="text-[10px] text-mil-ghost tracking-wider mt-0.5">{r.mode.toUpperCase()} · {r.cards.length} SLOTS</div>
<div className="flex flex-wrap gap-1 mt-2">
{r.themes.map(t => (
<span key={t} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(204,34,0,0.1)', border: '1px solid rgba(204,34,0,0.25)', color: '#cc2200' }}>{t}</span>
))}
</div>
</div>
<ArrowRight className="h-4 w-4 text-mil-ghost group-hover:text-mil-red group-hover:translate-x-0.5 transition mt-1" />
</div>
</button>
))}
</div>
</div>
);
}

// Default: leader picker
return (
<div className="space-y-3">
<div className="rounded-xl p-4 relative overflow-hidden" style={{
background: 'linear-gradient(135deg, rgba(204,34,0,0.06), rgba(13,26,15,0.7))',
border: '1px solid rgba(204,34,0,0.2)',
}}>
<div className="flex items-start gap-2">
<Award className="h-4 w-4 text-mil-red flex-shrink-0 mt-0.5" />
<div className="text-xs text-mil-stone leading-relaxed">
<span className="font-bold text-mil-paper">OFFICIAL RECIPES. </span>
{RECIPES.length} deck templates authored by the Warsaken creators (Eclectic Nerds LLC) and sourced from rules.warsaken.com. Each recipe specifies exact cards or flexible slots by type — we resolve every slot from the {ENRICHED.length}-card enriched pool using type and subtype matching as fallback. Recipes are labelled <span className="text-sky-300 font-bold">Blitz</span> (fast 1v1) or <span className="text-mil-red font-bold">Standard</span> (full game).ype matching as fallback.
</div>
</div>
</div>

  <div className="text-[10px] tracking-[0.2em] text-mil-fade">// CHOOSE A LEADER ({recipeLeaders.length})</div>
  <div className="space-y-2">
    {recipeLeaders.map(l => {
      const rs = getRecipesForLeader(l.id);
      return (
        <button key={l.id} onClick={() => setSelectedLeaderId(l.id)} className="w-full text-left rounded-xl overflow-hidden transition group" style={{
          background: 'linear-gradient(135deg, rgba(204,34,0,0.05), rgba(13,26,15,0.7))',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div className="p-3 flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(204,34,0,0.1)' }}>
              <Crown className="h-5 w-5 text-mil-red" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium truncate">{l.name}</div>
              <div className="text-[10px] text-mil-ghost tracking-wider mt-0.5">{l.id} · {rs.length} OFFICIAL RECIPE{rs.length === 1 ? '' : 'S'}</div>
              <div className="text-[10px] text-mil-red/70 mt-1 truncate">{rs.map(r => r.title).join(' · ')}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-mil-ghost group-hover:text-mil-red group-hover:translate-x-0.5 transition mt-1" />
          </div>
        </button>
      );
    })}
  </div>
</div>

);
}

// ============================================================================
// NOVEL MODE — composes a deck from synergy graph + leader analysis, with
// fully visible per-card reasoning. This is the “real AI” mode.
// ============================================================================
function NovelMode({ enrichedLeaders, novelLeaderId, novelResult, novelBuilding, buildNovel, loadNovelIntoDeck, backToNovel }) {
const teach = useTeach();

if (novelBuilding) {
return (
<div className="py-20 text-center">
<div className="relative inline-block">
<Brain className="h-12 w-12 mx-auto text-mil-redbright mb-3" style={{ filter: 'drop-shadow(0 0 16px rgba(204,34,0,0.5))' }} />
<div className="absolute inset-0 animate-ping opacity-30">
<Brain className="h-12 w-12 mx-auto text-mil-redbright" />
</div>
</div>
<div className="text-sm text-mil-paper tracking-wider mt-4 font-bold">SYNTHESIZING DECK...</div>
<div className="text-xs text-mil-fade mt-2 max-w-xs mx-auto leading-relaxed">
Analyzing leader abilities · Detecting archetypes · Scoring {ENRICHED.length} cards against synergy graph · Composing legion
</div>
</div>
);
}

if (novelResult) {
return <NovelResultView result={novelResult} onBack={backToNovel} onLoad={loadNovelIntoDeck} teach={teach} />;
}

// Leader selection
return (
<div className="space-y-4">
<div className="rounded-xl p-4 relative overflow-hidden" style={{
background: 'linear-gradient(135deg, rgba(192,132,252,0.08), rgba(204,34,0,0.05) 50%, rgba(0,0,0,0))',
border: '1px solid rgba(204,34,0,0.2)',
}}>
<div className="flex items-start gap-2">
<Brain className="h-4 w-4 text-mil-red flex-shrink-0 mt-0.5" />
<div className="text-xs text-mil-stone leading-relaxed">
<span className="font-bold text-mil-paper">NOVEL BUILDER. </span>
Composes an original deck from scratch — not a copy of any official recipe. This tool reads your leader's card text, infers their themes (Drone, Soldier, WMD, Territory, etc.), then scores every card in the enriched pool using keyword synergy, cost curve, stat efficiency, and leader-text affinity. Shows <span className="text-mil-red font-bold">visible reasoning for every pick</span>. Decks may be unconventional -- that's the point.
</div>
</div>
</div>

  <div className="text-[10px] tracking-[0.2em] text-mil-fade">// CHOOSE A LEADER ({enrichedLeaders.length})</div>
  <div className="space-y-2">
    {enrichedLeaders.map(l => (
      <button key={l.id} onClick={() => buildNovel(l.id)}
        className="w-full text-left rounded-xl overflow-hidden transition-all group relative"
        style={{
          background: 'linear-gradient(135deg, rgba(204,34,0,0.06), rgba(13,26,15,0.7) 40%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.03) inset',
        }}>
        <div className="p-3 flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(204,34,0,0.12)', boxShadow: '0 0 16px rgba(204,34,0,0.2)' }}>
            <Crown className="h-5 w-5 text-mil-red" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white font-medium truncate">{l.name}</div>
            <div className="text-[10px] text-mil-ghost tracking-wider mt-0.5">
              {l.id} · MORALE {l.morale} · HP {l.hp}
            </div>
            {l.abilities && (
              <div className="text-[10px] text-mil-red/80 tracking-wider mt-1.5 truncate">
                {l.abilities.filter(a => a.type === 'cooldown').slice(0,3).map(a => `↺${a.cost}:${a.name}`).join(' · ')}
              </div>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-mil-ghost group-hover:text-mil-red group-hover:translate-x-0.5 transition mt-1.5" />
        </div>
      </button>
    ))}
  </div>
</div>

);
}

function NovelResultView({ result, onBack, onLoad, teach }) {
const [showAllPicks, setShowAllPicks] = useState(false);
const visiblePicks = showAllPicks ? result.trace : result.trace.slice(0, 8);

return (
<div className="space-y-4">
<button onClick={onBack} className="text-xs text-mil-fade hover:text-mil-red flex items-center gap-1 transition">
← BUILD ANOTHER
</button>

  {/* Deck identity card */}
  <div className="relative rounded-xl overflow-hidden" style={{
    background: 'linear-gradient(135deg, rgba(204,34,0,0.12), rgba(192,132,252,0.06) 50%, rgba(13,26,15,0.85))',
    border: '1px solid rgba(204,34,0,0.3)',
    boxShadow: '0 8px 32px -8px rgba(204,34,0,0.2)',
  }}>
    <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(204,34,0,0.6), transparent)' }} />
    <div className="p-4">
      <div className="text-[10px] tracking-[0.2em] text-mil-red/80 mb-1">// SYNTHESIZED DECK</div>
      <div className="flex items-center gap-2 mb-2">
        <Crown className="h-5 w-5 text-mil-red" />
        <div className="text-xl font-bold text-white truncate">{result.leader.name}</div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {result.themes.map(t => (
          <span key={t} className="text-[11px] tracking-wider px-2 py-0.5 rounded-md" style={{ background: 'rgba(204,34,0,0.12)', border: '1px solid rgba(204,34,0,0.3)', color: '#cc2200' }}>
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <StatBox label="CARDS" value={`${result.totalCards}/65`} color="#cc2200" />
        <StatBox label="UNIQUE" value={Object.keys(result.deck).length} color="#86efac" />
        <StatBox label="KEYWORDS" value={Object.values(result.keywordCounts).reduce((s,n)=>s+n,0)} color="#7dd3fc" />
      </div>
    </div>
  </div>

  {/* Top synergy keywords */}
  {Object.keys(result.keywordCounts).length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Network className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">SYNERGY DENSITY · TAP TO LEARN</div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(result.keywordCounts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([kw, n]) => (
          <button key={kw} onClick={() => teach.showKeyword(kw)} className="text-[11px] px-2 py-1 rounded-md transition" style={{
            background: 'rgba(204,34,0,0.1)', border: '1px solid rgba(204,34,0,0.3)', color: '#cc2200',
          }}>
            {kw} <span className="text-mil-red/70 font-bold ml-1">×{n}</span>
          </button>
        ))}
      </div>
    </div>
  )}

  {/* Cost curve */}
  {Object.keys(result.costCurve).length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">COST CURVE</div>
      </div>
      <div className="space-y-2">
        {[0, 1, 2, 3].map(c => {
          const n = result.costCurve[c] || 0;
          const max = Math.max(...Object.values(result.costCurve), 1);
          return (
            <div key={c}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-mil-stone font-mono">↺ {c}</span>
                <span className="text-mil-fade">{n} cards</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(n/max)*100}%`, background: 'linear-gradient(90deg, #cc2200, #fb923c)', boxShadow: '0 0 8px rgba(204,34,0,0.4)' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Reasoning trace — the special sauce */}
  <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="flex items-center gap-2 mb-3">
      <Brain className="h-3.5 w-3.5 text-mil-red" />
      <div className="text-xs font-bold text-mil-paper tracking-wider">PER-CARD REASONING</div>
    </div>
    <div className="space-y-2">
      {visiblePicks.map((pick, i) => (
        <ReasoningCard key={pick.card.id} pick={pick} teach={teach} />
      ))}
    </div>
    {result.trace.length > 8 && (
      <button onClick={() => setShowAllPicks(s => !s)} className="w-full mt-3 py-2 rounded-md border border-white/10 text-mil-fade hover:text-mil-red hover:border-mil-red transition text-[11px] tracking-wider">
        {showAllPicks ? `← SHOW TOP 8 ONLY` : `SHOW ALL ${result.trace.length} PICKS →`}
      </button>
    )}
  </div>

  {/* Weaknesses (honest analysis) */}
  {result.weaknesses.length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.3)' }}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-3.5 w-3.5 text-rose-300" />
        <div className="text-xs font-bold text-rose-200 tracking-wider">PREDICTED WEAKNESSES</div>
      </div>
      <div className="space-y-1.5 text-xs text-mil-stone">
        {result.weaknesses.map((w, i) => (<div key={i} className="leading-relaxed">{w}</div>))}
      </div>
    </div>
  )}

  {/* Load button */}
  <button onClick={onLoad} className="w-full py-4 rounded-xl text-mil-paper hover:text-white transition flex items-center justify-center gap-2 font-bold tracking-wider sticky bottom-20" style={{
    background: 'linear-gradient(135deg, rgba(204,34,0,0.25), rgba(204,34,0,0.08))',
    border: '1px solid rgba(204,34,0,0.5)',
    boxShadow: '0 8px 32px rgba(204,34,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
  }}>
    <Layers className="h-4 w-4" /> SAVE AS NEW DECK
  </button>
</div>

);
}

function ReasoningCard({ pick, teach }) {
const meta = TYPE_META[pick.card.type] || { color: '#9ca3af', glow: 'rgba(0,0,0,0)' };
return (
<div className="rounded-lg overflow-hidden" style={{
background: 'rgba(20,20,24,0.5)',
border: '1px solid rgba(255,255,255,0.05)',
}}>
<button onClick={() => teach.showCard(pick.card.id)} className="w-full text-left p-3 hover:bg-white/[0.03] transition">
<div className="flex items-center justify-between mb-1">
<div className="flex items-center gap-2 min-w-0 flex-1">
<span className="text-[9px] font-bold tracking-wider w-12 flex-shrink-0" style={{ color: meta.color }}>{pick.card.type.slice(0,4).toUpperCase()}</span>
<span className="text-sm text-white truncate">{pick.card.name}</span>
<span className="text-[10px] text-mil-ghost font-mono">×{pick.copies}</span>
</div>
<div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
<span className="text-mil-red font-bold text-sm" style={{ textShadow: '0 0 8px rgba(204,34,0,0.4)' }}>{pick.score}</span>
</div>
</div>
<div className="space-y-0.5 mt-2">
{pick.reasons.slice(0, 4).map((r, i) => (
<div key={i} className="flex items-start gap-2 text-[11px]">
<span className={`font-bold w-7 text-right flex-shrink-0 ${r.pts > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
{r.pts > 0 ? '+' : ''}{r.pts}
</span>
<span className="text-mil-fade leading-relaxed">{r.why}</span>
</div>
))}
</div>
</button>
</div>
);
}

// ============================================================================
// COUNTER-META MODE — adversarial deckbuilder UI. Pick the leader you face,
// pick your own leader, get a deck designed to counter them with a visible
// threat-coverage matrix.
// ============================================================================
function CounterMode({ enrichedLeaders, targetCandidates, counterTargetId, setCounterTargetId, counterYourId, counterResult, counterBuilding, buildCounter, loadCounterIntoDeck, backToCounter }) {
const teach = useTeach();

if (counterBuilding) {
return (
<div className="py-20 text-center">
<div className="relative inline-block">
<Crosshair className="h-12 w-12 mx-auto text-rose-400 mb-3" style={{ filter: 'drop-shadow(0 0 16px rgba(251,113,133,0.5))' }} />
<div className="absolute inset-0 animate-ping opacity-30">
<Crosshair className="h-12 w-12 mx-auto text-rose-400" />
</div>
</div>
<div className="text-sm text-rose-200 tracking-wider mt-4 font-bold">PROFILING TARGET · BUILDING COUNTERS...</div>
<div className="text-xs text-mil-fade mt-2 max-w-xs mx-auto leading-relaxed">
Predicting target's likely deck · aggregating threat keywords · scoring every card with own-synergy + counter-value · mapping coverage matrix
</div>
</div>
);
}

if (counterResult) {
return <CounterResultView result={counterResult} onBack={backToCounter} onLoad={loadCounterIntoDeck} teach={teach} />;
}

// Step 1 — pick TARGET (who you face)
if (!counterTargetId) {
return (
<div className="space-y-4">
<div className="rounded-xl p-4 relative overflow-hidden" style={{
background: 'linear-gradient(135deg, rgba(251,113,133,0.08), rgba(13,26,15,0.7))',
border: '1px solid rgba(251,113,133,0.25)',
}}>
<div className="flex items-start gap-2">
<ShieldAlert className="h-4 w-4 text-rose-300 flex-shrink-0 mt-0.5" />
<div className="text-xs text-mil-stone leading-relaxed">
<span className="font-bold text-rose-200">COUNTER-META BUILDER. </span>
Pick the leader you expect to face. This tool predicts their likely deck by aggregating their official recipes (from rules.warsaken.com) plus an inferred Novel composition, then builds your deck to counter it. Scoring blends your own keyword synergy (35%) with counter-value against the predicted threat profile, and produces a <span className="text-rose-300 font-bold">threat-coverage matrix</span> showing which of their keywords your deck shuts down.
</div>
</div>
</div>

  <div className="text-[10px] tracking-[0.2em] text-rose-300/80">// STEP 1 · WHO YOU FACE ({targetCandidates.length})</div>
  <div className="space-y-2">
    {targetCandidates.map(l => {
      const recipeCount = getRecipesForLeader(l.id).length;
      return (
        <button key={l.id} onClick={() => setCounterTargetId(l.id)}
          className="w-full text-left rounded-xl overflow-hidden transition-all group relative"
          style={{
            background: 'linear-gradient(135deg, rgba(251,113,133,0.06), rgba(13,26,15,0.7) 40%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
          <div className="p-3 flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,113,133,0.12)', boxShadow: '0 0 16px rgba(251,113,133,0.2)' }}>
              <Crown className="h-5 w-5 text-rose-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium truncate">{l.name}</div>
              <div className="text-[10px] text-mil-ghost tracking-wider mt-0.5">
                {l.id} · {recipeCount} RECIPE{recipeCount === 1 ? '' : 'S'} · {l.hasFullData ? 'ENRICHED' : 'BASE'}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-mil-ghost group-hover:text-rose-300 group-hover:translate-x-0.5 transition mt-1.5" />
          </div>
        </button>
      );
    })}
  </div>
</div>

);
}

// Step 2 — pick YOUR leader
const target = getCard(counterTargetId);
return (
<div className="space-y-4">
<button onClick={() => setCounterTargetId(null)} className="text-xs text-mil-fade hover:text-rose-300 flex items-center gap-1 transition">← CHANGE TARGET</button>

  <div className="rounded-xl p-3" style={{ background: 'linear-gradient(135deg, rgba(251,113,133,0.1), rgba(13,26,15,0.8))', border: '1px solid rgba(251,113,133,0.3)' }}>
    <div className="text-[10px] tracking-[0.2em] text-rose-300/80 mb-1">// TARGET</div>
    <div className="flex items-center gap-2">
      <Crown className="h-4 w-4 text-rose-300" />
      <div className="text-sm text-white font-medium truncate">{target?.name || counterTargetId}</div>
    </div>
  </div>

  <div className="text-[10px] tracking-[0.2em] text-mil-red/80">// STEP 2 · WHO YOU PLAY ({enrichedLeaders.length})</div>
  <div className="space-y-2">
    {enrichedLeaders.map(l => (
      <button key={l.id} onClick={() => buildCounter(l.id, counterTargetId)}
        disabled={l.id === counterTargetId}
        className="w-full text-left rounded-xl overflow-hidden transition-all group relative disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, rgba(204,34,0,0.06), rgba(13,26,15,0.7) 40%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
        <div className="p-3 flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(204,34,0,0.12)', boxShadow: '0 0 16px rgba(204,34,0,0.2)' }}>
            <Crown className="h-5 w-5 text-mil-red" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white font-medium truncate">{l.name}</div>
            <div className="text-[10px] text-mil-ghost tracking-wider mt-0.5">
              {l.id} · MORALE {l.morale} · HP {l.hp}{l.id === counterTargetId ? ' · (TARGET)' : ''}
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-mil-ghost group-hover:text-mil-red group-hover:translate-x-0.5 transition mt-1.5" />
        </div>
      </button>
    ))}
  </div>
</div>

);
}

function CounterResultView({ result, onBack, onLoad, teach }) {
const [showAllPicks, setShowAllPicks] = useState(false);
const visiblePicks = showAllPicks ? result.trace : result.trace.slice(0, 8);
const sortedThreats = Object.entries(result.threatCoverage).sort((a, b) => b[1].weight - a[1].weight);
const maxWeight = Math.max(1, ...sortedThreats.map(t => t[1].weight));

return (
<div className="space-y-4">
<button onClick={onBack} className="text-xs text-mil-fade hover:text-rose-300 flex items-center gap-1 transition">
← BUILD ANOTHER
</button>

  {/* Side-by-side header: target (red) vs you (yellow) */}
  <div className="relative rounded-xl overflow-hidden" style={{
    background: 'linear-gradient(135deg, rgba(251,113,133,0.12), rgba(20,20,24,0.85) 50%, rgba(204,34,0,0.12))',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px -8px rgba(251,113,133,0.2), 0 8px 32px -8px rgba(204,34,0,0.2)',
  }}>
    <div className="p-4">
      <div className="text-[10px] tracking-[0.2em] text-mil-stone/80 mb-2">// COUNTER-META BUILD</div>
      <div className="grid grid-cols-2 gap-3 items-start">
        <div className="text-left min-w-0">
          <div className="text-[9px] tracking-[0.25em] text-rose-300/80 mb-1">TARGET</div>
          <div className="flex items-center gap-1.5">
            <Crown className="h-4 w-4 text-rose-300 flex-shrink-0" />
            <div className="text-base font-bold text-white truncate">{result.target.name}</div>
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(251,113,133,0.15)', border: '1px solid rgba(251,113,133,0.3)', color: '#fda4af' }}>
              {result.threat.archetype.toUpperCase()}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)', color: '#a8a29e' }}>
              {Math.round(result.threat.confidence * 100)}% KNOWN
            </span>
          </div>
        </div>
        <div className="text-right min-w-0">
          <div className="text-[9px] tracking-[0.25em] text-mil-red/80 mb-1">YOU PLAY</div>
          <div className="flex items-center gap-1.5 justify-end">
            <div className="text-base font-bold text-white truncate">{result.leader.name}</div>
            <Crown className="h-4 w-4 text-mil-red flex-shrink-0" />
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5 justify-end">
            {result.themes.map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(204,34,0,0.15)', border: '1px solid rgba(204,34,0,0.3)', color: '#cc2200' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <StatBox label="CARDS" value={`${result.totalCards}/65`} color="#cc2200" />
        <StatBox label="COVERAGE" value={`${Math.round(result.coveragePct * 100)}%`} color={result.coveragePct >= 0.5 ? '#86efac' : result.coveragePct >= 0.25 ? '#cc2200' : '#fb7185'} />
        <StatBox label="THREATS" value={`${result.coveredThreats}/${result.totalThreats}`} color="#7dd3fc" />
      </div>
    </div>
  </div>

  {/* THREAT COVERAGE MATRIX — the centerpiece */}
  {sortedThreats.length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(251,113,133,0.2)' }}>
      <div className="flex items-center gap-2 mb-3">
        <Crosshair className="h-3.5 w-3.5 text-rose-300" />
        <div className="text-xs font-bold text-rose-200 tracking-wider">THREAT COVERAGE MATRIX</div>
      </div>
      <div className="space-y-2">
        {sortedThreats.map(([kw, info]) => {
          const widthThreat = (info.weight / maxWeight) * 100;
          const covered = info.counterCount > 0;
          return (
            <div key={kw} className="text-[11px]">
              <div className="flex items-center justify-between mb-1 gap-2">
                <button onClick={() => teach.showKeyword(kw)} className="font-mono tracking-wider transition" style={{ color: covered ? '#cc2200' : '#fb7185' }}>
                  {covered ? '✓' : '⚠'} {kw}
                </button>
                <span className="text-mil-ghost text-[10px]">
                  threat {info.weight.toFixed(1)} · counters <span style={{ color: covered ? '#86efac' : '#fb7185' }} className="font-bold">×{info.counterCount}</span>
                </span>
              </div>
              <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
                <div className="absolute inset-y-0 left-0 rounded-full" style={{
                  width: `${widthThreat}%`,
                  background: covered ? 'linear-gradient(90deg, rgba(134,239,172,0.7), rgba(134,239,172,0.3))' : 'linear-gradient(90deg, rgba(251,113,133,0.7), rgba(251,113,133,0.3))',
                }} />
              </div>
              {covered && info.counterCards.length > 0 && (
                <div className="text-[10px] text-mil-ghost mt-1 truncate">
                  → {info.counterCards.slice(0, 3).map(cc => `${cc.ourKw}/${cc.name}`).join(' · ')}{info.counterCards.length > 3 ? ` · +${info.counterCards.length - 3}` : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Force-type triangle coverage */}
  {Object.keys(result.triangleCoverage).length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">FORCE-TYPE TRIANGLE</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['Ground', 'Air', 'Navy'].map(type => {
          const info = result.triangleCoverage[type];
          if (!info) {
            return (
              <div key={type} className="text-center rounded-lg p-2 opacity-40" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-[9px] tracking-[0.2em] text-mil-fade">{type.toUpperCase()}</div>
                <div className="text-base font-bold mt-1 text-mil-ghost/70">—</div>
                <div className="text-[9px] text-mil-ghost/70 mt-0.5">no threat</div>
              </div>
            );
          }
          const ratio = info.threatCount > 0 ? Math.min(info.counterCount / Math.max(info.threatCount / 4, 1), 1) : 0;
          const color = ratio >= 0.5 ? '#86efac' : ratio >= 0.2 ? '#cc2200' : '#fb7185';
          return (
            <div key={type} className="text-center rounded-lg p-2" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-[9px] tracking-[0.2em] text-mil-fade">{type.toUpperCase()}</div>
              <div className="text-base font-bold mt-1" style={{ color }}>×{info.counterCount}</div>
              <div className="text-[9px] text-mil-ghost mt-0.5">{info.counterKw}</div>
              <div className="text-[9px] text-mil-ghost/70 mt-0.5">vs {info.threatCount.toFixed(0)} forces</div>
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Your deck synergy density */}
  {Object.keys(result.keywordCounts).length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Network className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">YOUR DECK · SYNERGY DENSITY</div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(result.keywordCounts).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([kw, n]) => (
          <button key={kw} onClick={() => teach.showKeyword(kw)} className="text-[11px] px-2 py-1 rounded-md transition" style={{
            background: 'rgba(204,34,0,0.1)', border: '1px solid rgba(204,34,0,0.3)', color: '#cc2200',
          }}>
            {kw} <span className="text-mil-red/70 font-bold ml-1">×{n}</span>
          </button>
        ))}
      </div>
    </div>
  )}

  {/* Cost curve */}
  {Object.keys(result.costCurve).length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-3.5 w-3.5 text-mil-red" />
        <div className="text-xs font-bold text-mil-paper tracking-wider">COST CURVE</div>
      </div>
      <div className="space-y-2">
        {[0, 1, 2, 3].map(c => {
          const n = result.costCurve[c] || 0;
          const max = Math.max(...Object.values(result.costCurve), 1);
          return (
            <div key={c}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-mil-stone font-mono">↺ {c}</span>
                <span className="text-mil-fade">{n} cards</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.65)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(n/max)*100}%`, background: 'linear-gradient(90deg, #cc2200, #fb923c)', boxShadow: '0 0 8px rgba(204,34,0,0.4)' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Per-card reasoning */}
  <div className="rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="flex items-center gap-2 mb-3">
      <Brain className="h-3.5 w-3.5 text-mil-red" />
      <div className="text-xs font-bold text-mil-paper tracking-wider">PER-CARD REASONING</div>
    </div>
    <div className="space-y-2">
      {visiblePicks.map(pick => (
        <CounterReasoningCard key={pick.card.id} pick={pick} teach={teach} />
      ))}
    </div>
    {result.trace.length > 8 && (
      <button onClick={() => setShowAllPicks(s => !s)} className="w-full mt-3 py-2 rounded-md border border-white/10 text-mil-fade hover:text-mil-red hover:border-mil-red transition text-[11px] tracking-wider">
        {showAllPicks ? `← SHOW TOP 8 ONLY` : `SHOW ALL ${result.trace.length} PICKS →`}
      </button>
    )}
  </div>

  {/* Weaknesses */}
  {result.weaknesses.length > 0 && (
    <div className="rounded-xl p-4" style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.3)' }}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-3.5 w-3.5 text-rose-300" />
        <div className="text-xs font-bold text-rose-200 tracking-wider">PREDICTED WEAKNESSES</div>
      </div>
      <div className="space-y-1.5 text-xs text-mil-stone">
        {result.weaknesses.map((w, i) => (<div key={i} className="leading-relaxed">{w}</div>))}
      </div>
    </div>
  )}

  <button onClick={onLoad} className="w-full py-4 rounded-xl text-rose-100 hover:text-white transition flex items-center justify-center gap-2 font-bold tracking-wider sticky bottom-20" style={{
    background: 'linear-gradient(135deg, rgba(251,113,133,0.25), rgba(253,224,71,0.18))',
    border: '1px solid rgba(251,113,133,0.5)',
    boxShadow: '0 8px 32px rgba(251,113,133,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
  }}>
    <Layers className="h-4 w-4" /> SAVE COUNTER DECK
  </button>
</div>

);
}

function CounterReasoningCard({ pick, teach }) {
const meta = TYPE_META[pick.card.type] || { color: '#9ca3af', glow: 'rgba(0,0,0,0)' };
return (
<div className="rounded-lg overflow-hidden" style={{
background: 'rgba(20,20,24,0.5)',
border: '1px solid rgba(255,255,255,0.05)',
}}>
<button onClick={() => teach.showCard(pick.card.id)} className="w-full text-left p-3 hover:bg-white/[0.03] transition">
<div className="flex items-center justify-between mb-1">
<div className="flex items-center gap-2 min-w-0 flex-1">
<span className="text-[9px] font-bold tracking-wider w-12 flex-shrink-0" style={{ color: meta.color }}>{pick.card.type.slice(0,4).toUpperCase()}</span>
<span className="text-sm text-white truncate">{pick.card.name}</span>
<span className="text-[10px] text-mil-ghost font-mono">×{pick.copies}</span>
</div>
<div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
<span className="text-[10px] text-mil-ghost">own {pick.ownScore} + ctr {pick.counterScore} =</span>
<span className="text-mil-red font-bold text-sm" style={{ textShadow: '0 0 8px rgba(204,34,0,0.4)' }}>{pick.score}</span>
</div>
</div>
{pick.counterReasons.length > 0 && (
<div className="space-y-0.5 mt-2">
{pick.counterReasons.slice(0, 3).map((r, i) => (
<div key={`c-${i}`} className="flex items-start gap-2 text-[11px]">
<span className="font-bold w-7 text-right flex-shrink-0 text-rose-300">+{r.pts}</span>
<span className="text-rose-200/90 leading-relaxed">⚔ {r.why}</span>
</div>
))}
</div>
)}
{pick.ownReasons.length > 0 && (
<div className="space-y-0.5 mt-1">
{pick.ownReasons.slice(0, 3).map((r, i) => (
<div key={`o-${i}`} className="flex items-start gap-2 text-[11px]">
<span className={`font-bold w-7 text-right flex-shrink-0 ${r.pts > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
{r.pts > 0 ? '+' : ''}{r.pts}
</span>
<span className="text-mil-fade leading-relaxed">{r.why}</span>
</div>
))}
</div>
)}
</button>
</div>
);
}

// ============================================================================
// SYNERGY DISCOVERY TAB
// ============================================================================
function SynergyTab() {
const [view, setView] = useState('combos'); // combos | keyword | card
const [selectedKeyword, setSelectedKeyword] = useState(null);
const [selectedCardId, setSelectedCardId] = useState(null);
const [search, setSearch] = useState('');

// Pre-compute the leaderboard of top combos
const topCombos = useMemo(() => {
return SYN.coOccurrences
.map(([a, b, n]) => scoreCombo(a, b))
.filter(c => c.cardsWithBoth.length > 0)
.sort((a, b) => b.score - a.score);
}, []);

// Pre-compute card synergy scores for cards we have data on
const cardScores = useMemo(() => {
return Object.keys(SYN.cardKeywords).map(id => {
const card = getCard(id);
const { score, breakdown } = scoreCardSynergy(id);
return { card, score, breakdown, keywords: getCardKeywords(id) };
}).filter(x => x.card).sort((a, b) => b.score - a.score);
}, []);

// Outliers: cards with rare-keyword combinations
const outliers = useMemo(() => {
// For each card, sum the inverse rarity of its keywords
const kwFreq = {};
Object.values(SYN.cardKeywords).forEach(kws => {
kws.forEach(k => kwFreq[k] = (kwFreq[k] || 0) + 1);
});
return Object.entries(SYN.cardKeywords)
.map(([id, kws]) => {
if (kws.length < 2) return null;
const rarityScore = kws.reduce((s, k) => s + (1 / (kwFreq[k] || 1)), 0);
return { card: getCard(id), keywords: kws, rarityScore };
})
.filter(x => x && x.card)
.sort((a, b) => b.rarityScore - a.rarityScore)
.slice(0, 8);
}, []);

return (
<>
<header className="sticky top-0 z-30 border-b border-mil-border bg-stone-950/95 backdrop-blur">
<div className="px-4 py-3">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-2">
<Network className="h-3.5 w-3.5 text-mil-red" />
<h1 className="text-xs tracking-[0.3em] text-mil-stone uppercase">Synergy Discoverer</h1>
</div>
<span className="text-[10px] text-mil-ghost tracking-wider">{SYN.edges.length} EDGES · {SYN.coOccurrences.length} COMBOS</span>
</div>
<div className="flex gap-1 overflow-x-auto pb-1">
<button onClick={() => setView('combos')} className={`text-[11px] px-2.5 py-1 border whitespace-nowrap transition ${view === 'combos' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>
<Flame className="h-3 w-3 inline -mt-0.5 mr-1" />TOP COMBOS
</button>
<button onClick={() => setView('keyword')} className={`text-[11px] px-2.5 py-1 border whitespace-nowrap transition ${view === 'keyword' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>
<GitBranch className="h-3 w-3 inline -mt-0.5 mr-1" />KEYWORDS
</button>
<button onClick={() => setView('card')} className={`text-[11px] px-2.5 py-1 border whitespace-nowrap transition ${view === 'card' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>
<Target className="h-3 w-3 inline -mt-0.5 mr-1" />CARDS
</button>
<button onClick={() => setView('outliers')} className={`text-[11px] px-2.5 py-1 border whitespace-nowrap transition ${view === 'outliers' ? 'border-mil-red text-mil-red bg-mil-red/10' : 'border-mil-border text-mil-fade'}`}>
<Sparkles className="h-3 w-3 inline -mt-0.5 mr-1" />OUTLIERS
</button>
</div>
</div>
</header>

  <main className="px-4 py-4">
    {/* Methodology disclosure */}
    <div className="border border-mil-red/30 bg-mil-red/5 p-3 mb-4 text-xs text-mil-stone leading-relaxed">
      <div className="flex items-start gap-2">
        <Brain className="h-4 w-4 text-mil-redbright flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-mil-red">METHODOLOGY: </span>
          Edges parsed from official rules text (e.g., "ARMORED: Not affected by DEAD MAN" → ARMORED counters DEAD MAN). Combos found by co-occurrence on enriched cards. Quality scales with the {Object.keys(SYN.cardKeywords).length}-card keyword pool.
        </div>
      </div>
    </div>

    {view === 'combos' && (
      <div className="space-y-2">
        <div className="text-xs tracking-wider text-mil-fade">// TOP KEYWORD COMBOS</div>
        {topCombos.length === 0 ? (
          <div className="text-center py-12 text-mil-ghost text-sm">No combos discovered yet.</div>
        ) : topCombos.map(c => (
          <ComboCard key={c.pair.join('+')} combo={c} onPickKeyword={(k) => { setSelectedKeyword(k); setView('keyword'); }} onPickCard={(id) => { setSelectedCardId(id); setView('card'); }} />
        ))}
      </div>
    )}

    {view === 'keyword' && !selectedKeyword && (
      <div className="space-y-2">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mil-ghost" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search.keywords_"
            className="w-full bg-mil-panel border border-mil-border pl-10 pr-3 py-2 text-sm text-mil-paper placeholder:text-mil-ghost/70 focus:border-mil-red focus:outline-none transition" />
        </div>
        <div className="text-xs tracking-wider text-mil-fade">// PICK A KEYWORD TO INSPECT</div>
        <div className="grid grid-cols-2 gap-1.5">
          {SYN.keywords
            .filter(k => k.name.length < 30)
            .filter(k => !search || k.name.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 80)
            .map(k => {
              const cards = getCardsWithKeyword(k.name);
              const edges = getEdgesFor(k.name);
              return (
                <button key={k.name} onClick={() => setSelectedKeyword(k.name)}
                  className="text-left border border-mil-border bg-mil-panel/60 hover:bg-mil-panel hover:border-mil-red transition p-2">
                  <div className="text-[11px] font-bold tracking-wider text-mil-red truncate">{k.name}</div>
                  <div className="text-[9px] text-mil-ghost mt-0.5">{cards.length} cards · {edges.length} edges</div>
                </button>
              );
            })}
        </div>
      </div>
    )}

    {view === 'keyword' && selectedKeyword && (
      <KeywordInspector keyword={selectedKeyword}
        onBack={() => setSelectedKeyword(null)}
        onPickCard={(id) => { setSelectedCardId(id); setView('card'); }}
        onPickKeyword={(k) => setSelectedKeyword(k)} />
    )}

    {view === 'card' && !selectedCardId && (
      <div className="space-y-2">
        <div className="text-xs tracking-wider text-mil-fade">// CARDS RANKED BY SYNERGY SCORE</div>
        {cardScores.map(({ card, score, keywords }) => (
          <button key={card.id} onClick={() => setSelectedCardId(card.id)}
            className="w-full text-left border border-mil-border bg-mil-panel/60 hover:bg-mil-panel hover:border-mil-red transition p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-mil-paper font-medium truncate flex-1">{card.name}</span>
              <span className="text-mil-red font-bold ml-2">{score}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {keywords.map(k => (
                <span key={k} className="text-[9px] px-1.5 py-0.5 bg-mil-red/10 border border-mil-red/30 text-mil-paper">{k}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    )}

    {view === 'card' && selectedCardId && (
      <CardSynergyDetail cardId={selectedCardId}
        onBack={() => setSelectedCardId(null)}
        onPickKeyword={(k) => { setSelectedKeyword(k); setView('keyword'); }} />
    )}

    {view === 'outliers' && (
      <div className="space-y-2">
        <div className="text-xs tracking-wider text-mil-fade mb-2">// CARDS WITH RARE KEYWORD COMBINATIONS</div>
        <div className="text-[10px] text-mil-ghost mb-3 leading-relaxed">
          Cards holding keywords that don't appear together often anywhere else. These are candidates for "hidden power" — combinations the meta hasn't fully explored.
        </div>
        {outliers.map(({ card, keywords, rarityScore }) => (
          <button key={card.id} onClick={() => { setSelectedCardId(card.id); setView('card'); }}
            className="w-full text-left border border-mil-border bg-mil-panel/60 hover:bg-mil-panel hover:border-mil-red transition p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-mil-paper font-medium truncate flex-1">{card.name}</span>
              <span className="text-mil-red text-[11px] tracking-wider ml-2">RARITY {rarityScore.toFixed(2)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {keywords.map(k => (
                <span key={k} className="text-[9px] px-1.5 py-0.5 bg-mil-red/10 border border-mil-red/30 text-mil-paper">{k}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    )}
  </main>
</>

);
}

function ComboCard({ combo, onPickKeyword, onPickCard }) {
return (
<div className="border border-mil-border bg-mil-panel/60 p-3">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-2 flex-wrap">
<button onClick={() => onPickKeyword(combo.pair[0])} className="text-[11px] font-bold tracking-wider px-2 py-0.5 bg-mil-red/10 border border-mil-red/30 text-mil-paper hover:bg-mil-red/20">
{combo.pair[0]}
</button>
<Plus className="h-3 w-3 text-mil-ghost/70" />
<button onClick={() => onPickKeyword(combo.pair[1])} className="text-[11px] font-bold tracking-wider px-2 py-0.5 bg-mil-red/10 border border-mil-red/30 text-mil-paper hover:bg-mil-red/20">
{combo.pair[1]}
</button>
</div>
<div className="flex items-center gap-2 text-[10px]">
{combo.hasReferences && !combo.hasCounters && (
<span className="text-green-400 tracking-wider">DOC SYNERGY</span>
)}
{combo.hasCounters && (
<span className="text-rose-400 tracking-wider">COUNTERS</span>
)}
<span className="text-mil-red font-bold">{combo.score}</span>
</div>
</div>
{combo.cardsWithBoth.length > 0 && (
<div className="space-y-1">
<div className="text-[9px] text-mil-ghost tracking-wider">FOUND ON {combo.cardsWithBoth.length} CARD{combo.cardsWithBoth.length === 1 ? '' : 'S'}:</div>
{combo.cardsWithBoth.map(id => {
const card = getCard(id);
if (!card) return null;
return (
<button key={id} onClick={() => onPickCard(id)} className="w-full text-left text-xs text-mil-stone hover:text-mil-red transition">
· {card.name}
</button>
);
})}
</div>
)}
</div>
);
}

function KeywordInspector({ keyword, onBack, onPickCard, onPickKeyword }) {
const kwData = getSynKeyword(keyword);
const cards = getCardsWithKeyword(keyword);
const edges = getEdgesFor(keyword);
const counterEdges = edges.filter(e => e[2] === 'counters');
const refEdges = edges.filter(e => e[2] === 'references');

return (
<div className="space-y-3">
<button onClick={onBack} className="text-xs text-mil-fade hover:text-mil-red flex items-center gap-1">← BACK</button>
<div className="border border-mil-red/40 bg-yellow-400/5 p-3">
<div className="text-[10px] tracking-wider text-mil-red mb-1">// KEYWORD</div>
<div className="text-xl font-bold text-mil-paper mb-2">{keyword}</div>
{kwData?.text && <div className="text-sm text-mil-stone leading-relaxed">{kwData.text}</div>}
{kwData?.detail && (
<div className="text-xs text-mil-fade leading-relaxed mt-2 pt-2 border-t border-mil-red/20">{kwData.detail}</div>
)}
</div>

  {counterEdges.length > 0 && (
    <div className="border border-rose-500/30 bg-rose-500/5 p-3">
      <div className="text-rose-300 text-xs font-bold tracking-wider mb-2">COUNTER RELATIONSHIPS</div>
      <div className="space-y-1.5 text-xs">
        {counterEdges.map((e, i) => (
          <div key={i} className="flex items-center gap-2">
            <button onClick={() => onPickKeyword(e[0] === keyword ? e[1] : e[0])} className="font-bold text-mil-paper hover:text-mil-red">{e[0]}</button>
            <span className="text-mil-ghost">→ counters →</span>
            <button onClick={() => onPickKeyword(e[1] === keyword ? e[0] : e[1])} className="font-bold text-mil-paper hover:text-mil-red">{e[1]}</button>
          </div>
        ))}
      </div>
    </div>
  )}

  {refEdges.length > 0 && (
    <div className="border border-mil-border bg-mil-panel/60 p-3">
      <div className="text-mil-red text-xs font-bold tracking-wider mb-2">REFERENCED IN RULES</div>
      <div className="flex flex-wrap gap-1.5">
        {refEdges.map((e, i) => {
          const other = e[0] === keyword ? e[1] : e[0];
          return (
            <button key={i} onClick={() => onPickKeyword(other)} className="text-[11px] px-2 py-1 bg-mil-muted border border-mil-green text-mil-stone hover:border-mil-red hover:text-mil-red transition">
              {other}
            </button>
          );
        })}
      </div>
    </div>
  )}

  <div className="border border-mil-border bg-mil-panel/60 p-3">
    <div className="text-mil-red text-xs font-bold tracking-wider mb-2">CARDS WITH THIS KEYWORD ({cards.length})</div>
    {cards.length === 0 ? (
      <div className="text-xs text-mil-ghost">No enriched cards have this keyword yet.</div>
    ) : (
      <div className="space-y-1">
        {cards.map(c => (
          <button key={c.id} onClick={() => onPickCard(c.id)} className="w-full text-left flex items-center justify-between text-xs hover:text-mil-red transition">
            <span className="text-mil-stone truncate">{c.name}</span>
            <span className="text-mil-ghost/70 text-[10px] ml-2">{c.id}</span>
          </button>
        ))}
      </div>
    )}
  </div>
</div>

);
}

function CardSynergyDetail({ cardId, onBack, onPickKeyword }) {
const card = getCard(cardId);
const keywords = getCardKeywords(cardId);
const { score, breakdown } = scoreCardSynergy(cardId);

// Find all edges involving this card’s keywords
const allEdges = [];
for (const k of keywords) {
for (const e of getEdgesFor(k)) {
allEdges.push({ ...{ from: e[0], to: e[1], rel: e[2] }, sourceKw: k });
}
}
// Dedupe
const seen = new Set();
const uniqueEdges = allEdges.filter(e => {
const key = [e.from, e.to, e.rel].sort().join('|');
if (seen.has(key)) return false;
seen.add(key);
return true;
});

// What other cards share at least one keyword with this card?
const partners = Object.entries(SYN.cardKeywords)
.filter(([id, kws]) => id !== cardId && kws.some(k => keywords.includes(k)))
.map(([id, kws]) => ({
card: getCard(id),
shared: kws.filter(k => keywords.includes(k)),
total: kws.length,
}))
.filter(p => p.card)
.sort((a, b) => b.shared.length - a.shared.length);

return (
<div className="space-y-3">
<button onClick={onBack} className="text-xs text-mil-fade hover:text-mil-red flex items-center gap-1">← BACK</button>

  <div className="border border-mil-red/40 bg-yellow-400/5 p-3">
    <div className="flex items-start justify-between mb-2">
      <div>
        <div className="text-[10px] tracking-wider text-mil-red">// CARD</div>
        <div className="text-lg font-bold text-mil-paper">{card?.name}</div>
        <div className="text-[10px] tracking-wider text-mil-ghost mt-0.5">{card?.id} · {card?.type}</div>
      </div>
      <div className="text-right">
        <div className="text-[10px] tracking-wider text-mil-ghost">SYNERGY</div>
        <div className="text-2xl font-bold text-mil-red">{score}</div>
      </div>
    </div>
    <div className="flex flex-wrap gap-1 mt-2">
      {keywords.map(k => (
        <button key={k} onClick={() => onPickKeyword(k)} className="text-[10px] px-1.5 py-0.5 bg-mil-red/10 border border-mil-red/30 text-mil-paper hover:bg-mil-red/20">
          {k}
        </button>
      ))}
    </div>
  </div>

  {breakdown.length > 0 && (
    <div className="border border-mil-border bg-mil-panel/60 p-3">
      <div className="text-mil-red text-xs font-bold tracking-wider mb-2">SCORE BREAKDOWN</div>
      <div className="space-y-1 text-xs">
        {breakdown.map((b, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-mil-stone truncate flex-1">
              {b.keyword || (b.pair && b.pair.join(' + '))}
              {b.reason && <span className="text-mil-ghost text-[10px] ml-1">({b.reason})</span>}
            </span>
            <span className={`font-bold ${b.points > 0 ? 'text-green-400' : 'text-rose-400'} ml-2`}>
              {b.points > 0 ? '+' : ''}{b.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  )}

  {uniqueEdges.length > 0 && (
    <div className="border border-mil-border bg-mil-panel/60 p-3">
      <div className="text-mil-red text-xs font-bold tracking-wider mb-2">RULES INTERACTIONS</div>
      <div className="space-y-1.5 text-xs">
        {uniqueEdges.map((e, i) => (
          <div key={i} className="flex items-center gap-2 flex-wrap">
            <button onClick={() => onPickKeyword(e.from)} className="font-bold text-mil-paper hover:text-mil-red">{e.from}</button>
            <span className={e.rel === 'counters' ? 'text-rose-400' : 'text-mil-ghost'}>
              {e.rel === 'counters' ? '✕ counters' : '↔ refs'}
            </span>
            <button onClick={() => onPickKeyword(e.to)} className="font-bold text-mil-paper hover:text-mil-red">{e.to}</button>
          </div>
        ))}
      </div>
    </div>
  )}

  {partners.length > 0 && (
    <div className="border border-mil-border bg-mil-panel/60 p-3">
      <div className="text-mil-red text-xs font-bold tracking-wider mb-2">SYNERGY PARTNERS ({partners.length})</div>
      <div className="space-y-1.5">
        {partners.slice(0, 12).map(p => (
          <div key={p.card.id} className="text-xs">
            <div className="flex items-center justify-between">
              <span className="text-mil-stone truncate flex-1">{p.card.name}</span>
              <span className="text-[10px] text-mil-ghost ml-2">{p.shared.length} shared</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {p.shared.map(k => (
                <span key={k} className="text-[9px] px-1.5 py-0 bg-mil-muted border border-mil-green text-mil-stone">{k}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

);
}
