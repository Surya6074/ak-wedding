"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Link2,
  Copy,
  Check,
  Share2,
  Sparkles,
  ExternalLink,
  Users,
  ArrowLeft,
  Plus,
  Trash2,
  Globe,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import MonogramBadge from "@/components/ui/MonogramBadge";
import FloralDivider from "@/components/ui/FloralDivider";

interface GeneratedItem {
  id: string;
  name: string;
  url: string;
}

const DEFAULT_LIVE_DOMAIN = "https://surya6074.github.io/ak-wedding";

export default function InviteGeneratorPage() {
  const [guestName, setGuestName] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [baseUrl, setBaseUrl] = useState(DEFAULT_LIVE_DOMAIN);
  const [isEditingBase, setIsEditingBase] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [linksList, setLinksList] = useState<GeneratedItem[]>([]);

  const formatCapitalized = (str: string) => {
    return str
      .split(" ")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
      .join(" ");
  };

  const cleanBase = baseUrl.replace(/\/+$/, "");
  const cleanSingleName = formatCapitalized(guestName.trim());
  const singleUrl = cleanSingleName
    ? `${cleanBase}/?invite=${encodeURIComponent(cleanSingleName)}`
    : `${cleanBase}/?invite=Guest`;

  const getFullInvitationMessage = (name: string, url: string) => {
    return (
      `✨ *WEDDING INVITATION* ✨\n\n` +
      `Dearest *${name}*,\n\n` +
      `Together with our families, we cordially invite you to celebrate our wedding!\n\n` +
      `💍 *Aravindh & Karthiga*\n\n` +
      `📅 *Engagement Ceremony:*\n` +
      `Saturday, 14th November 2026 • 7:00 PM onwards\n\n` +
      `💒 *Muhurtham (Wedding):*\n` +
      `Sunday, 15th November 2026 • 8:00 AM – 9:15 AM\n\n` +
      `📍 *Venue:*\n` +
      `Aaryan Thirumana Mahal, Madurai\n\n` +
      `${url}`
    );
  };

  const handleCopy = (text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddSingle = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cleanSingleName) return;

    const formattedName = cleanSingleName;
    const newItem: GeneratedItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      name: formattedName,
      url: `${cleanBase}/?invite=${encodeURIComponent(formattedName)}`,
    };

    setLinksList((prev) => [newItem, ...prev]);
    setGuestName("");
  };

  const handleProcessBulk = () => {
    if (!bulkInput.trim()) return;

    const names = bulkInput
      .split(/[\n,]+/)
      .map((n) => formatCapitalized(n.trim()))
      .filter((n) => n.length > 0);

    const newItems: GeneratedItem[] = names.map((name) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      name,
      url: `${cleanBase}/?invite=${encodeURIComponent(name)}`,
    }));

    setLinksList((prev) => [...newItems, ...prev]);
    setBulkInput("");
    setIsBulkMode(false);
  };

  const handleDeleteItem = (id: string) => {
    setLinksList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopyAll = () => {
    if (linksList.length === 0) return;
    const allText = linksList
      .map((item) => `${item.name}: ${item.url}`)
      .join("\n\n");
    handleCopy(allText, "copy-all");
  };

  const getWhatsAppShareUrl = (name: string, url: string) => {
    const message = getFullInvitationMessage(name, url);
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2C2422] py-12 px-4 sm:px-6 relative overflow-x-hidden selection:bg-[#C5A059] selection:text-white">
      {/* Background Decorative Auras */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-champagne-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        {/* Navigation & Back to Website */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-editorial text-champagne-700 hover:text-editorial transition-colors p-2 rounded-xl bg-white/70 border border-champagne-300/60 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Invitation</span>
          </Link>

          <span className="text-xs font-serif text-editorial-muted">
            Aravindh & Karthiga
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-3">
          <MonogramBadge size={64} />
          <h1 className="font-heading text-4xl sm:text-5xl font-medium text-editorial tracking-tight pt-2">
            Invite Link Generator
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-editorial-muted max-w-lg mx-auto">
            Create customized, personalized invitation links for your guests with their names on the card cover.
          </p>
          <FloralDivider variant="heart" className="my-4" />

          {/* Live Domain Badge & Configuration */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-champagne-300/80 shadow-sm text-xs font-serif text-editorial-muted">
            <Globe className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
            <span className="font-semibold text-editorial">Live Target:</span>
            {!isEditingBase ? (
              <span className="font-mono text-[11px] text-champagne-700 font-semibold truncate max-w-xs sm:max-w-md">
                {cleanBase}
              </span>
            ) : (
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="px-2 py-0.5 rounded border border-champagne-300 font-mono text-xs text-editorial w-64"
              />
            )}
            <button
              onClick={() => setIsEditingBase(!isEditingBase)}
              className="text-[10px] uppercase font-bold text-champagne-600 hover:text-editorial underline ml-1"
            >
              {isEditingBase ? "Done" : "Change"}
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-champagne-300/80 shadow-sm max-w-sm mx-auto">
          <button
            onClick={() => setIsBulkMode(false)}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-serif uppercase tracking-editorial font-semibold transition-all ${
              !isBulkMode
                ? "bg-editorial text-white shadow-sm"
                : "text-editorial-muted hover:text-editorial"
            }`}
          >
            Single Guest
          </button>
          <button
            onClick={() => setIsBulkMode(true)}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-serif uppercase tracking-editorial font-semibold transition-all ${
              isBulkMode
                ? "bg-editorial text-white shadow-sm"
                : "text-editorial-muted hover:text-editorial"
            }`}
          >
            Multiple / Bulk
          </button>
        </div>

        {/* Input Card */}
        <div className="rounded-3xl bg-white/95 border border-champagne-300 shadow-luxury p-6 sm:p-8 space-y-6">
          {!isBulkMode ? (
            /* Single Name Generator */
            <form onSubmit={handleAddSingle} className="space-y-4">
              <label
                htmlFor="single-guest-name"
                className="block text-xs font-serif uppercase tracking-editorial text-champagne-700 font-semibold"
              >
                Enter Guest or Family Name:
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="single-guest-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(formatCapitalized(e.target.value))}
                  placeholder="Name"
                  className="flex-1 px-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-champagne-300 text-editorial placeholder:text-editorial-light/60 text-sm focus:outline-none focus:ring-2 focus:ring-champagne-400 capitalize"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!cleanSingleName}
                  className="py-3.5 px-6 rounded-2xl bg-editorial hover:bg-black disabled:opacity-50 text-white text-xs font-serif uppercase tracking-editorial font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4 text-champagne-300" />
                  <span>Add to List</span>
                </button>
              </div>

              {/* Instant Live Link & WhatsApp Box for Single Guest */}
              {cleanSingleName && (
                <div className="mt-4 p-5 rounded-2xl bg-sand-50/70 border border-champagne-300/80 space-y-4">
                  <div className="flex items-center justify-between text-xs font-serif">
                    <span className="text-champagne-700 font-medium">
                      Generated Live Link for <strong className="text-editorial">"{cleanSingleName}"</strong>:
                    </span>
                    <a
                      href={singleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-champagne-600 hover:text-editorial flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <span>Preview Invitation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-champagne-200 text-xs font-mono text-editorial break-all select-all font-semibold">
                    {singleUrl}
                  </div>

                  {/* Primary Sharing Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {/* 1. Share on WhatsApp Button */}
                    <a
                      href={getWhatsAppShareUrl(cleanSingleName, singleUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-serif uppercase tracking-editorial font-semibold transition-all shadow-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>

                    {/* 2. Copy Full Invitation Message */}
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          getFullInvitationMessage(cleanSingleName, singleUrl),
                          "copy-message"
                        )
                      }
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-editorial hover:bg-black text-white text-xs font-serif uppercase tracking-editorial font-semibold transition-all shadow-sm"
                    >
                      {copiedId === "copy-message" ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Message Copied!</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4 text-champagne-300" />
                          <span>Copy Message & Link</span>
                        </>
                      )}
                    </button>

                    {/* 3. Copy Link Only */}
                    <button
                      type="button"
                      onClick={() => handleCopy(singleUrl, "single-copy")}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-champagne-100 text-editorial border border-champagne-300 text-xs font-serif uppercase tracking-editorial font-semibold transition-all shadow-sm"
                    >
                      {copiedId === "single-copy" ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-champagne-600" />
                          <span>Copy Link Only</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* WhatsApp Message Preview Bubble */}
                  <div className="mt-4 pt-3 border-t border-champagne-200/70">
                    <span className="text-[11px] font-serif uppercase tracking-editorial text-champagne-700 font-semibold block mb-2">
                      WhatsApp Message Preview:
                    </span>
                    <div className="p-3.5 rounded-2xl bg-[#E7F6EC] border border-[#25D366]/30 text-xs font-sans text-[#111B21] space-y-2 max-w-md shadow-sm">
                      <div className="p-2.5 rounded-xl bg-white/90 border border-emerald-200/60 shadow-xs space-y-1">
                        <div className="w-full aspect-[2/1] rounded-lg overflow-hidden bg-champagne-100 relative">
                          <img
                            src={`${cleanBase}/og-image.jpg`}
                            alt="Invitation Preview Card"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-semibold text-xs text-gray-900 pt-1">
                          Aravindh & Karthiga — Wedding Invitation
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          Save the Date: 14 & 15 November 2026 • Madurai
                        </p>
                      </div>
                      <p className="text-xs whitespace-pre-line leading-relaxed font-sans text-gray-800">
                        {getFullInvitationMessage(cleanSingleName, singleUrl)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Bulk / Multiple Names Generator */
            <div className="space-y-4">
              <label
                htmlFor="bulk-names"
                className="block text-xs font-serif uppercase tracking-editorial text-champagne-700 font-semibold"
              >
                Paste or Type Multiple Names (one per line or comma-separated):
              </label>

              <textarea
                id="bulk-names"
                rows={5}
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Names"
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-champagne-300 text-editorial placeholder:text-editorial-light/60 text-sm focus:outline-none focus:ring-2 focus:ring-champagne-400 font-serif capitalize"
              />

              <button
                onClick={handleProcessBulk}
                disabled={!bulkInput.trim()}
                className="w-full py-3.5 px-6 rounded-2xl bg-editorial hover:bg-black disabled:opacity-50 text-white text-xs font-serif uppercase tracking-editorial font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-champagne-300" />
                <span>Generate Links for All Names</span>
              </button>
            </div>
          )}
        </div>

        {/* Generated Links List */}
        {linksList.length > 0 && (
          <div className="rounded-3xl bg-white/95 border border-champagne-300 shadow-luxury p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-champagne-200 gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-champagne-600" />
                <h2 className="font-heading text-xl text-editorial font-medium">
                  Generated Invitation Links ({linksList.length})
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyAll}
                  className="text-xs font-serif uppercase tracking-editorial text-champagne-700 hover:text-editorial flex items-center gap-1 font-semibold"
                >
                  {copiedId === "copy-all" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>All Links Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-champagne-600" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>

                <span className="text-champagne-300">|</span>

                <button
                  onClick={() => setLinksList([])}
                  className="text-xs font-serif text-editorial-muted hover:text-rosewood-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* List Items */}
            <div className="space-y-3">
              {linksList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2] border border-champagne-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-champagne-400 transition-colors"
                >
                  <div className="space-y-0.5 flex-1 truncate pr-2">
                    <span className="font-heading text-lg text-editorial font-medium block">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono text-editorial-muted truncate block">
                      {item.url}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Copy Full Message */}
                    <button
                      onClick={() =>
                        handleCopy(
                          getFullInvitationMessage(item.name, item.url),
                          `msg-${item.id}`
                        )
                      }
                      className="py-2 px-3 rounded-xl bg-editorial hover:bg-black text-white text-xs font-serif flex items-center gap-1.5 transition-colors shadow-xs"
                      title="Copy WhatsApp Message & Link"
                    >
                      {copiedId === `msg-${item.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-3.5 h-3.5 text-champagne-300" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>

                    {/* Copy Link Only */}
                    <button
                      onClick={() => handleCopy(item.url, item.id)}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-champagne-100 text-editorial border border-champagne-300 text-xs font-serif flex items-center gap-1.5 transition-colors"
                      title="Copy Link Only"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-champagne-600" />
                      )}
                    </button>

                    {/* WhatsApp Share */}
                    <a
                      href={getWhatsAppShareUrl(item.name, item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-serif flex items-center gap-1.5 transition-colors shadow-xs"
                      title="Share directly on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Test Preview */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white hover:bg-champagne-100 text-editorial-muted hover:text-editorial border border-champagne-300 transition-colors"
                      title="Preview Invitation"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Delete Item */}
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 rounded-xl hover:bg-rosewood-100/60 text-editorial-muted hover:text-rosewood-600 transition-colors"
                      title="Delete from list"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Helpful Tips Card */}
        <div className="rounded-2xl bg-champagne-100/60 border border-champagne-300/60 p-4 sm:p-5 text-xs font-serif text-editorial-muted space-y-1.5">
          <p className="font-semibold text-champagne-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-champagne-600" />
            <span>WhatsApp Sharing Pro-Tip:</span>
          </p>
          <p>
            When pasting the link in WhatsApp, wait <strong>1 to 2 seconds</strong> before hitting send. WhatsApp will automatically fetch and display the royal gold preview card and thumbnail!
          </p>
        </div>
      </div>
    </main>
  );
}
