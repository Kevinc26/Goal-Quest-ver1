import React from "react";

type BossArenaDecorProps = {
  regionId: number;
};

const shared = <><span className="arena-depth-haze"/><span className="arena-floor-rim"/></>;

export default function BossArenaDecor({ regionId }: BossArenaDecorProps) {
  if (regionId === 1) {
    return <div className="boss-arena-decor boss-arena-decor--chaos" aria-hidden="true">{shared}<i className="chaos-wisp chaos-wisp--1"/><i className="chaos-wisp chaos-wisp--2"/><i className="chaos-wisp chaos-wisp--3"/><i className="chaos-rune chaos-rune--1">?</i><i className="chaos-rune chaos-rune--2">×</i><i className="chaos-rune chaos-rune--3">!</i></div>;
  }

  if (regionId === 2) {
    return <div className="boss-arena-decor boss-arena-decor--mountain" aria-hidden="true">{shared}<i className="mountain-shard mountain-shard--1"/><i className="mountain-shard mountain-shard--2"/><i className="mountain-shard mountain-shard--3"/><i className="mountain-dust mountain-dust--1"/><i className="mountain-dust mountain-dust--2"/></div>;
  }

  if (regionId === 3) {
    return <div className="boss-arena-decor boss-arena-decor--city" aria-hidden="true">{shared}<i className="city-signal city-signal--1"/><i className="city-signal city-signal--2"/><i className="city-signal city-signal--3"/><span className="city-noise city-noise--1">DISTRACTION</span><span className="city-noise city-noise--2">AGAIN</span></div>;
  }

  if (regionId === 4) {
    return <div className="boss-arena-decor boss-arena-decor--desert" aria-hidden="true">{shared}<i className="desert-heat desert-heat--1"/><i className="desert-heat desert-heat--2"/><i className="desert-ember desert-ember--1"/><i className="desert-ember desert-ember--2"/><i className="desert-ember desert-ember--3"/></div>;
  }

  if (regionId === 5) {
    return <div className="boss-arena-decor boss-arena-decor--ocean" aria-hidden="true">{shared}<i className="ocean-wave ocean-wave--1"/><i className="ocean-wave ocean-wave--2"/><i className="ocean-bubble ocean-bubble--1"/><i className="ocean-bubble ocean-bubble--2"/><i className="ocean-bubble ocean-bubble--3"/></div>;
  }

  if (regionId === 6) {
    return <div className="boss-arena-decor boss-arena-decor--sky" aria-hidden="true">{shared}<i className="sky-cloud sky-cloud--1"/><i className="sky-cloud sky-cloud--2"/><i className="sky-lightning sky-lightning--1"/><i className="sky-lightning sky-lightning--2"/></div>;
  }

  if (regionId === 7) {
    return <div className="boss-arena-decor boss-arena-decor--hell" aria-hidden="true">{shared}<i className="hell-ember hell-ember--1"/><i className="hell-ember hell-ember--2"/><i className="hell-ember hell-ember--3"/><i className="hell-flame hell-flame--1"/><i className="hell-flame hell-flame--2"/></div>;
  }

  return <div className="boss-arena-decor boss-arena-decor--harmony" aria-hidden="true">{shared}<i className="harmony-ring harmony-ring--1"/><i className="harmony-ring harmony-ring--2"/><i className="harmony-feather harmony-feather--1">✧</i><i className="harmony-feather harmony-feather--2">✦</i><i className="harmony-feather harmony-feather--3">✧</i></div>;
}
