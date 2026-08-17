import React from "react";

type BossSpriteProps = {
  regionId: number;
  className?: string;
};

const DragonDisorder = () => (
  <>
    <g className="boss-body">
      <path d="M55 172c18-38 28-70 61-84 34-14 70 2 80 33 9 29-4 58-35 69-25 9-50 1-62-17 22 5 43-4 50-22 7-20-8-40-29-42-25-3-42 14-50 41l-15 22Z" fill="#38c9a4" stroke="#123f48" strokeWidth="8"/>
      <path d="M81 120c-18-5-32-18-35-36 13 7 27 8 41 4-2-13 3-27 12-38 8 10 13 20 14 32 12-9 27-13 42-10-7 9-10 19-9 30" fill="#76e657" stroke="#123f48" strokeWidth="8"/>
      <path d="M130 80c20-22 42-32 68-31-10 13-13 25-9 37 15-5 30-4 44 4-15 10-24 22-26 37" fill="#ff4f9a" stroke="#123f48" strokeWidth="8"/>
      <path d="M112 135c20 3 39 0 54-10-3 13-14 23-29 27-11 3-22 1-31-5Z" fill="#1a665e"/>
    </g>
    <g className="boss-head">
      <path d="m73 104 27-20 35 7 15 28-20 25-39-4-17-22Z" fill="#58d8ad" stroke="#123f48" strokeWidth="7"/>
      <path d="m94 87 5-23 12 17 14-20 3 25" fill="#e9d34d" stroke="#123f48" strokeWidth="5"/>
      <circle className="boss-eye" cx="113" cy="106" r="7" fill="#fff06a"/>
      <circle cx="115" cy="106" r="3" fill="#17282f"/>
      <path d="m98 123 28 1-17 14Z" fill="#f8fbff"/>
    </g>
    <g className="boss-core">
      <circle cx="151" cy="157" r="13" fill="#ff4f9a" opacity=".75"/>
      <circle cx="151" cy="157" r="6" fill="#fff3fb"/>
    </g>
    <g className="boss-fragment" fill="#ff4f9a"><rect x="179" y="104" width="9" height="9"/><rect x="191" y="139" width="6" height="6"/><rect x="166" y="78" width="7" height="7"/></g>
  </>
);

const GolemOldSelf = () => (
  <>
    <g className="boss-body">
      <path d="M63 173 47 112l31-24 19-40 46 4 19 36 36 20-8 69-39 22-52-5Z" fill="#7f899a" stroke="#2d3444" strokeWidth="8"/>
      <path d="m88 96 24-18 35 9 15 33-24 32-42-7-18-28Z" fill="#596171" stroke="#2d3444" strokeWidth="7"/>
      <path d="m111 103 14 12 17-11 4 29-22 13-23-15Z" fill="#bed4dc"/>
      <path d="M96 128h47M105 145l-8 22M137 145l10 22" stroke="#333b4a" strokeWidth="6"/>
    </g>
    <g className="boss-arm boss-arm-left"><path d="m70 127-36 22 19 32 38-12" fill="#697385" stroke="#2d3444" strokeWidth="9"/><rect x="30" y="145" width="28" height="32" rx="5" fill="#8e98a8" stroke="#2d3444" strokeWidth="7"/></g>
    <g className="boss-arm boss-arm-right"><path d="m166 122 40 18-14 37-37-12" fill="#697385" stroke="#2d3444" strokeWidth="9"/><rect x="184" y="142" width="28" height="32" rx="5" fill="#8e98a8" stroke="#2d3444" strokeWidth="7"/></g>
    <path d="M105 56 90 27l34 11 22-21 8 39" fill="#a5aebd" stroke="#2d3444" strokeWidth="7"/>
    <g className="boss-core"><path d="m113 112 12-9 13 10-5 17-14 2-10-10Z" fill="#65e2dc"/><circle cx="124" cy="118" r="4" fill="#e8ffff"/></g>
    <g className="boss-chain" stroke="#9aa4b5" strokeWidth="5" fill="none"><path d="M73 180c-18 15-27 24-38 33"/><path d="M174 181c18 14 27 22 39 31"/></g>
  </>
);

const HydraHabits = () => (
  <>
    <path d="M84 186c-17-33-19-63 1-88 20-25 52-27 77-12 28 18 34 54 20 88" fill="#3e9796" stroke="#173b49" strokeWidth="8"/>
    {[0,1,2].map((i) => {
      const x = 68 + i * 48;
      const y = i === 1 ? 42 : 61;
      return (
        <g key={i} className={`boss-head boss-head-${i + 1}`}>
          <path d={`M${x + 24} 119C${x + 8} 93 ${x - 2} 72 ${x + 2} ${y + 18}`} fill="none" stroke={i === 1 ? "#5fd8b8" : "#3fa6a7"} strokeWidth="23"/>
          <path d={`M${x - 8} ${y + 18} 19-16 32 7-3 24-28 5Z`} fill={i === 1 ? "#76e7c5" : "#50b5b4"} stroke="#173b49" strokeWidth="6"/>
          <circle className="boss-eye" cx={x + 4} cy={y + 16} r="4.5" fill="#ffe064"/>
          <path d={`M${x - 2} ${y + 31}h15`} stroke="#173b49" strokeWidth="4"/>
        </g>
      );
    })}
    <path d="M72 168c24-9 50-10 77 1 22 10 35 26 38 46H57c1-18 6-34 15-47Z" fill="#3f7f78" stroke="#173b49" strokeWidth="8"/>
    <g className="boss-core"><circle cx="122" cy="177" r="14" fill="#a8ff70" opacity=".78"/><path d="m114 177 8-9 8 9-8 10Z" fill="#f5ffd9"/></g>
  </>
);

const PhoenixDiscouragement = () => (
  <>
    <g className="boss-wing boss-wing-left"><path d="M116 106C89 69 54 63 18 86c28 12 47 30 58 55-18 9-31 23-39 43 32 1 59-11 81-36Z" fill="#ff6d32" stroke="#5d2b2a" strokeWidth="8"/></g>
    <g className="boss-wing boss-wing-right"><path d="M125 105c27-37 62-43 98-20-28 12-47 30-58 55 18 9 31 23 39 43-32 1-59-11-81-36Z" fill="#ff6d32" stroke="#5d2b2a" strokeWidth="8"/></g>
    <path d="M121 32c20 17 29 37 26 60 19 10 29 27 29 50 0 34-23 63-55 63s-55-29-55-63c0-23 10-41 30-52-4-22 5-42 25-58Z" fill="#ff8b35" stroke="#5d2b2a" strokeWidth="8"/>
    <path d="M116 68c20 18 25 38 15 60l25 20-35 32-36-31 25-21c-10-19-8-39 6-60Z" fill="#ffd84a" stroke="#8d3f26" strokeWidth="7"/>
    <circle className="boss-eye" cx="109" cy="119" r="5" fill="#3e2432"/><circle className="boss-eye" cx="134" cy="119" r="5" fill="#3e2432"/>
    <g className="boss-core"><circle cx="121" cy="151" r="15" fill="#fff0a5"/><path d="m121 134 10 17-10 16-10-16Z" fill="#ff7a2c"/></g>
    <g className="boss-ember" fill="#ffd84a"><rect x="42" y="54" width="8" height="8"/><rect x="190" y="57" width="7" height="7"/><rect x="202" y="124" width="6" height="6"/></g>
  </>
);

const KrakenLaziness = () => (
  <>
    <path d="M81 113c0-39 20-67 45-67 28 0 52 30 52 67 0 27-13 52-31 65H99c-12-12-18-37-18-65Z" fill="#5963b9" stroke="#242c64" strokeWidth="8"/>
    <path d="M94 73c11-21 25-34 45-40 11 9 18 21 20 37" fill="#8994ee" stroke="#242c64" strokeWidth="7"/>
    <circle className="boss-eye" cx="109" cy="104" r="8" fill="#d9f7ff"/><circle className="boss-eye" cx="146" cy="104" r="8" fill="#d9f7ff"/><circle cx="110" cy="105" r="3" fill="#20295f"/><circle cx="147" cy="105" r="3" fill="#20295f"/>
    <path d="M107 129c11 7 24 7 36 0" fill="none" stroke="#2a326e" strokeWidth="5"/>
    <path className="boss-tentacle boss-tentacle-1" d="M69 161c-31 6-45 28-33 52 5-18 20-25 39-19 22 7 36-2 39-25" fill="none" stroke="#6e78d8" strokeWidth="18" strokeLinecap="round"/>
    <path className="boss-tentacle boss-tentacle-2" d="M106 169c-14 22-10 42 11 57 1-19 10-30 27-34 18-5 27-15 25-33" fill="none" stroke="#6e78d8" strokeWidth="18" strokeLinecap="round"/>
    <path className="boss-tentacle boss-tentacle-3" d="M155 168c13 13 28 13 43 2 14-10 26-7 35 10-2-28-24-41-59-35" fill="none" stroke="#6e78d8" strokeWidth="18" strokeLinecap="round"/>
    <g className="boss-core"><circle cx="126" cy="148" r="13" fill="#69e6ff" opacity=".8"/><circle cx="126" cy="148" r="5" fill="#e9fcff"/></g>
  </>
);

const DragonCreativeBlock = () => (
  <>
    <g className="boss-body"><path d="M60 172c10-43 37-71 80-81 31-8 57 7 68 33 11 27 3 55-22 74-21 15-47 17-71 6 30-8 45-25 42-47-3-20-22-30-42-24-15 4-27 15-35 31Z" fill="#7767d8" stroke="#2a285f" strokeWidth="8"/></g>
    <g className="boss-wing"><path d="M105 108c-23-14-39-34-48-60 21 9 39 9 54 1 4-18 13-32 29-44 7 18 16 32 29 39 15-9 32-11 50-6-15 15-23 31-24 50" fill="#9d8cff" stroke="#2a285f" strokeWidth="8"/></g>
    <g className="boss-head"><path d="m105 104 31-23 31 20-14 32-39 4Z" fill="#5146a7"/><circle className="boss-eye" cx="135" cy="105" r="7" fill="#eaf7ff"/><circle cx="137" cy="105" r="3" fill="#342b76"/></g>
    <g className="boss-core"><path d="m142 146 15 17-13 20-18-13 4-22Z" fill="#70eaff"/><path d="m141 151 8 12-8 10-8-9Z" fill="#effcff"/></g>
    <g className="boss-lightning" fill="#70eaff"><path d="m45 75 20 11-14 10 19 9-31 15 10-19-16-6Z"/><path d="m192 137 17 9-12 8 15 7-25 12 8-15-13-5Z"/></g>
  </>
);

const DemonAnxiety = () => (
  <>
    <g className="boss-body"><path d="M72 182c-8-40 3-77 30-99 28-22 67-17 89 10 21 26 23 62 8 93l-31 24-69-3Z" fill="#b93c55" stroke="#4b1d36" strokeWidth="8"/></g>
    <path d="M97 82 70 38l41 20 9-37 17 36 39-22-18 51" fill="#d84c63" stroke="#4b1d36" strokeWidth="8"/>
    <g className="boss-face"><path d="M98 112c9-17 24-23 41-19 20 6 32 24 28 45-5 20-23 33-44 29-20-5-33-23-28-43Z" fill="#762943"/><circle className="boss-eye" cx="119" cy="121" r="7" fill="#ffcc5c"/><circle className="boss-eye" cx="148" cy="121" r="7" fill="#ffcc5c"/><path d="M111 148c11 10 27 11 40 2" fill="none" stroke="#ffcc5c" strokeWidth="6"/></g>
    <path className="boss-arm boss-arm-left" d="M70 157 29 185l31 11" fill="none" stroke="#b93c55" strokeWidth="16" strokeLinecap="round"/>
    <path className="boss-arm boss-arm-right" d="m191 155 38 32-33 13" fill="none" stroke="#b93c55" strokeWidth="16" strokeLinecap="round"/>
    <g className="boss-core"><circle cx="126" cy="174" r="14" fill="#ff665b" opacity=".9"/><path d="m126 160 9 14-9 13-9-13Z" fill="#ffd76a"/></g>
  </>
);

const AngelBalance = () => (
  <>
    <g className="boss-wing boss-wing-left"><path d="M104 72c-25-11-51-8-75 9 17 15 30 33 38 56-20 9-35 25-44 47 32 1 58-9 79-30" fill="#e7efff" stroke="#6b79a4" strokeWidth="8"/></g>
    <g className="boss-wing boss-wing-right"><path d="M137 72c25-11 51-8 75 9-17 15-30 33-38 56 20 9 35 25 44 47-32 1-58-9-79-30" fill="#e7efff" stroke="#6b79a4" strokeWidth="8"/></g>
    <path d="M84 106c2-31 18-53 38-53 22 0 38 23 39 55l-8 79H92Z" fill="#f7f1da" stroke="#7d6fa0" strokeWidth="8"/>
    <circle className="boss-halo" cx="122" cy="41" r="28" fill="none" stroke="#ffd35e" strokeWidth="8"/>
    <circle className="boss-eye" cx="108" cy="111" r="5" fill="#5c507a"/><circle className="boss-eye" cx="138" cy="111" r="5" fill="#5c507a"/>
    <path d="m121 128-13 17 14 13 14-13Z" fill="#8f7ee7"/>
    <g className="boss-core"><circle cx="122" cy="153" r="15" fill="#fff2a6"/><path d="m122 139 9 14-9 15-9-15Z" fill="#a78df1"/></g>
    <path d="M122 168v42" stroke="#ffd35e" strokeWidth="7"/><path d="m101 185 21 26 22-26" fill="none" stroke="#ffd35e" strokeWidth="7"/>
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
      shapeRendering="crispEdges"
      data-boss-region={regionId}
    >
      {bosses[regionId] ?? bosses[1]}
    </svg>
  );
}
