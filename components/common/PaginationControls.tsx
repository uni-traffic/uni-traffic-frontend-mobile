import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  prev: () => void;
  next: () => void;
  setPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  prev,
  next,
  setPage,
  hasPrev,
  hasNext
}: PaginationControlsProps) => {
  // Generate exactly 3-page numbers centered around current page when possible
  const getPageNumbers = () => {
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    // Adjust if we're at the beginning
    if (currentPage === 1) {
      startPage = 1;
      endPage = Math.min(3, totalPages);
    }
    // Adjust if we're at the end
    else if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
      endPage = totalPages;
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <View style={styles.container}>
      {/* Previous Button - Left aligned */}
      <TouchableOpacity
        onPress={prev}
        disabled={!hasPrev}
        style={[styles.navButton, hasPrev ? styles.activeNavButton : styles.disabledNavButton]}
      >
        <Text style={[styles.navButtonText, !hasPrev && styles.disabledNavButtonText]}>Prev</Text>
      </TouchableOpacity>

      {/* Page Numbers - Centered and grouped together */}
      <View style={styles.pageNumbersContainer}>
        {getPageNumbers().map((page) => (
          <TouchableOpacity
            key={page}
            onPress={() => setPage(page)}
            style={[
              styles.pageButton,
              page === currentPage ? styles.activePageButton : styles.inactivePageButton
            ]}
          >
            <Text
              style={[styles.pageButtonText, page === currentPage && styles.activePageButtonText]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button - Right aligned */}
      <TouchableOpacity
        onPress={next}
        disabled={!hasNext}
        style={[styles.navButton, hasNext ? styles.activeNavButton : styles.disabledNavButton]}
      >
        <Text style={[styles.navButtonText, !hasNext && styles.disabledNavButtonText]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1
  },
  activeNavButton: {
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db"
  },
  disabledNavButton: {
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb"
  },
  navButtonText: {
    fontWeight: "500",
    color: "#374151"
  },
  disabledNavButtonText: {
    color: "#9ca3af"
  },
  pageNumbersContainer: {
    flexDirection: "row",
    gap: 8
  },
  pageButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1
  },
  activePageButton: {
    backgroundColor: "#3b82f6",
    borderColor: "#2563eb"
  },
  inactivePageButton: {
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db"
  },
  pageButtonText: {
    fontWeight: "500",
    color: "#374151"
  },
  activePageButtonText: {
    color: "white"
  }
});

export default PaginationControls;
