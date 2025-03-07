import { formatFileSize } from '@/shared/lib/utils';

describe('formatFileSize', () => {
  it('returns "0 Bytes" when input is 0', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('formats bytes correctly', () => {
    expect(formatFileSize(500)).toBe('500 Bytes');
    expect(formatFileSize(999)).toBe('999 Bytes');
  });

  it('formats kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(10240)).toBe('10 KB');
  });

  it('formats megabytes correctly', () => {
    expect(formatFileSize(1048576)).toBe('1 MB');
    expect(formatFileSize(2097152)).toBe('2 MB');
    expect(formatFileSize(2621440)).toBe('2.5 MB');
  });

  it('formats gigabytes correctly', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB');
    expect(formatFileSize(3221225472)).toBe('3 GB');
    expect(formatFileSize(5368709120)).toBe('5 GB');
  });

  it('rounds to 2 decimal places', () => {
    expect(formatFileSize(1126)).toBe('1.1 KB');
    expect(formatFileSize(1127)).toBe('1.1 KB');
    expect(formatFileSize(1177)).toBe('1.15 KB');
    expect(formatFileSize(1178)).toBe('1.15 KB');
  });
});
