import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BallotProvider, useBallot } from './BallotContext';
import React from 'react';

describe('BallotContext', () => {
  it('should toggle candidates in ballot', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BallotProvider>{children}</BallotProvider>
    );

    const { result } = renderHook(() => useBallot(), { wrapper });

    act(() => {
      result.current.toggleCandidate('cand-1');
    });

    expect(result.current.isSaved('cand-1')).toBe(true);
    expect(result.current.savedCandidates).toContain('cand-1');

    act(() => {
      result.current.toggleCandidate('cand-1');
    });

    expect(result.current.isSaved('cand-1')).toBe(false);
  });
});
