import React from "react";

type BossSpriteProps = {
  regionId: number;
  className?: string;
};

const DragonDisorder = () => (
  <>
    <path d="M61 167c22-29 30-61 60-74 31-13 62 3 71 30 8 25-3 52-30 62-21 8-39 0-49-14 19 4 38-3 43-18 6-18-7-36-26-38-22-2-35 14-45 36l-24 28Z" fill="#42c9a5" stroke="#123f48" strokeWidth="8"/>
    <path d="M84 112c-15-4-27-16-29-31 11 6 23 7 35 3-1-11 3-24 11-33 7 9 11 17 12 27 10-8 23-12 36-9-6 8-8 16-7 26" fill="#7be35b" stroke="#123f48" strokeWidth="8"/>
    <path d="M126 76c17-19 36-28 58-27-8 11-11 21-8 31 13-4 26-3 38 3-13 9-20 19-22 32" fill="#ff4f9a" stroke="#123f48" strokeWidth="8"/>
    <circle cx="119" cy="96" r="7" fill="#ffef73"/><path d="M94 103h27l-16 17Z" fill="#f7f7ff"/>
    <path d="M137 130c10 6 19 7 30 4" fill="none" stroke="#ff4f9a" strokeWidth="7"/>
  </>
);

const GolemOldSelf = () => (
  <>
    <path d="M62 171 48 113l31-23 19-39 43 4 18 35 34 19-7 66-38 21-48-5Z" fill="#7e8799" stroke="#2d3444" strokeWidth="8"/>
    <path d="m88 96 23-18 34 9 13 32-22 30-40-6-18-26Z" fill="#596171" stroke="#2d3444" strokeWidth="7"/>
    <path d="m108 105 15 12 16-11 4 27-21 12-21-14Z" fill="#b9d2db"/>
    <path d="m68 129-31 21 18 28 33-11M165 122l37 17-13 34-34-10" fill="#697385" stroke="#2d3444" strokeWidth="9"/>
    <path d="M105 55 91 29l31 10 21-20 7 37" fill="#a3acbb" stroke="#2d3444" strokeWidth="7"/>
  </>
);

const HydraHabits = () => (
  <>
    <path d="M89 186c-16-31-18-58 1-82 18-23 48-25 70-11 25 17 30 49 18 83" fill="#41999a" stroke="#173b49" strokeWidth="8"/>
    {[0,1,2].map((i) => {
      const x = 76 + i * 43;
      const y = i === 1 ? 46 : 62;
      return <g key={i}><path d={`M${x+17} 115C${x+4} 92 ${x-4} 72 ${x} ${y+20}`} fill="none" stroke={i===1?"#5fd1b4":"#3fa6a7"} strokeWidth="22"/><path d={`M${x-9} ${y+18} 18-15 30 7-3 23-26 4Z`} fill={i===1?"#73e4c3":"#50b5b4"} stroke="#173b49" strokeWidth="6"/><circle cx={x+2} cy={y+17} r="4" fill="#ffe064"/></g>;
    })}
    <path d="M76 170c21-8 45-9 69 1 20 9 31 23 33 41H63c1-17 5-31 13-42Z" fill="#3f7f78" stroke="#173b49" strokeWidth="8"/>
  </>
);

const PhoenixDiscouragement = () => (
  <>
    <path d="M120 39c20 14 29 31 27 52 21-10 43-9 66 4-22 10-35 25-42 45 17 10 27 24 31 44-22-8-43-7-61 4-8 5-15 12-21 22-7-13-18-23-31-29-16-8-34-9-54-3 5-17 15-31 30-40-9-18-23-32-43-42 23-13 46-15 68-5-2-21 10-37 30-50Z" fill="#ff7a35" stroke="#5d2b2a" strokeWidth="8"/>
    <path d="M116 72c18 16 23 34 14 53l24 19-34 29-34-28 24-19c-9-17-7-35 6-54Z" fill="#ffd84a" stroke="#8d3f26" strokeWidth="7"/>
    <circle cx="109" cy="115" r="5" fill="#3e2432"/><circle cx="132" cy="115" r="5" fill="#3e2432"/>
  </>
);

const KrakenLaziness = () => (
  <>
    <path d="M82 114c0-37 19-64 43-64 26 0 49 29 49 64 0 25-12 48-29 61H99c-11-10-17-34-17-61Z" fill="#5963b9" stroke="#242c64" strokeWidth="8"/>
    <circle cx="108" cy="104" r="7" fill="#d9f7ff"/><circle cx="143" cy="104" r="7" fill="#d9f7ff"/>
    <path d="M68 164c-28 5-40 25-29 47 4-17 18-23 35-18 20 6 33-2 36-22M105 170c-13 20-9 38 10 52 1-17 9-27 25-31 16-4 24-14 22-30M153 170c12 11 25 11 39 1 13-9 24-6 32 9-2-25-22-37-54-32" fill="none" stroke="#6e78d8" strokeWidth="17" strokeLinecap="round"/>
    <path d="M93 74c10-19 24-31 43-36 10 8 16 19 18 34" fill="#8994ee" stroke="#242c64" strokeWidth="7"/>
  </>
);

const DragonCreativeBlock = () => (
  <>
    <path d="M63 169c9-40 34-66 74-76 29-7 53 7 63 31 10 25 3 50-20 68-19 14-43 16-65 6 28-8 41-23 38-43-3-18-20-27-38-22-13 3-24 13-32 29Z" fill="#7767d8" stroke="#2a285f" strokeWidth="8"/>
    <path d="M103 106c-20-13-34-31-42-54 19 8 35 8 49 1 3-16 12-29 26-40 6 17 14 29 26 36 13-8 28-10 44-5-13 13-20 27-21 44" fill="#9d8cff" stroke="#2a285f" strokeWidth="8"/>
    <path d="m111 104 27-21 27 18-12 28-34 4Z" fill="#5146a7"/>
    <circle cx="134" cy="105" r="6" fill="#eaf7ff"/>
    <path d="m47 80 18 10-13 9 17 8-28 13 9-17-14-5Z" fill="#70eaff"/>
  </>
);

const DemonAnxiety = () => (
  <>
    <path d="M75 180c-7-37 3-72 28-92 26-20 62-16 82 9 19 24 21 57 7 86l-28 22-62-3Z" fill="#b93c55" stroke="#4b1d36" strokeWidth="8"/>
    <path d="M98 83 73 42l38 18 8-34 16 33 36-20-17 47" fill="#d84c63" stroke="#4b1d36" strokeWidth="8"/>
    <path d="M101 112c8-15 22-21 37-17 18 5 29 21 25 40-4 18-21 30-40 26-18-4-29-21-25-39Z" fill="#762943"/>
    <circle cx="119" cy="120" r="6" fill="#ffcc5c"/><circle cx="145" cy="120" r="6" fill="#ffcc5c"/>
    <path d="M111 145c10 9 24 10 36 2" fill="none" stroke="#ffcc5c" strokeWidth="6"/>
    <path d="M72 156 34 182l29 10M185 154l35 30-30 12" fill="none" stroke="#b93c55" strokeWidth="15" strokeLinecap="round"/>
  </>
);

const AngelBalance = () => (
  <>
    <path d="M105 73c-22-10-45-7-66 8 15 13 27 29 34 49-18 8-31 22-39 41 28 1 51-8 69-27M136 72c22-10 45-7 66 8-15 13-27 29-34 49 18 8 31 22 39 41-28 1-51-8-69-27" fill="#e7efff" stroke="#6b79a4" strokeWidth="8"/>
    <path d="M85 105c2-29 17-49 36-49 20 0 35 21 36 51l-7 74H92Z" fill="#f7f1da" stroke="#7d6fa0" strokeWidth="8"/>
    <circle cx="121" cy="45" r="26" fill="none" stroke="#ffd35e" strokeWidth="8"/>
    <circle cx="108" cy="110" r="5" fill="#5c507a"/><circle cx="136" cy="110" r="5" fill="#5c507a"/>
    <path d="m120 126-12 16 13 12 13-12Z" fill="#8f7ee7"/>
    <path d="M121 154v48" stroke="#ffd35e" strokeWidth="7"/><path d="m102 177 19 25 20-25" fill="none" stroke="#ffd35e" strokeWidth="7"/>
  </>
);

const bosses: Record<number, React.ReactNode> = {
  1: <DragonDisorder />,
  2: <GolemOldSelf />,
  3: <HydraHabits />,
  4: <PhoenixDiscouragement />,
  5: <KrakenLaziness />,
  6: <DragonCreativeBlock />,
  7: <DemonAnxiety />,
  8: <AngelBalance />
};

export default function BossSprite({ regionId, className }: BossSpriteProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      role="img"
      aria-label={`Region ${regionId} boss`}
      shapeRendering="geometricPrecision"
    >
      {bosses[regionId] ?? bosses[1]}
    </svg>
  );
}
